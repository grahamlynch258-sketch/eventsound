# EventSound blog automation V1

## What is included

V1 adds a structured blog to the existing React/Supabase website and four n8n workflow imports. An article moves through these safe states:

`idea → researching → awaiting_images → building → awaiting_approval → published`

The database is the source of truth. AI produces Markdown and structured fields; it never writes React, HTML or other production source files. Public database access can only read rows whose status is `published`.

The existing contact form, Netlify email function, SMTP configuration and Turnstile configuration are outside this system and were not changed.

## Architecture in plain terms

1. Workflow A receives a topic, loads approved EventSound website context, asks OpenAI for a structured SEO brief and draft, validates it, and saves it to `blog_posts`.
2. Workflow B creates a Google Drive upload folder and stores the request and folder ID against the post. It can email the request when Gmail is connected.
3. Workflow C accepts uploaded images, moves production copies into the public Supabase `blog-images` bucket, analyses each image, saves the results in `blog_images`, chooses a hero, revises the Markdown and stops at `awaiting_approval`.
4. Workflow D accepts an explicit, token-protected human decision. Approval calls the guarded `approve_blog_post` database function; rejection keeps the draft and images.
5. The website only queries published rows. `/blog`, `/blog/:slug`, the sitemap and prerender script all use the published filter.

Content is Markdown without raw HTML. Inline database images use `{{image:IMAGE_UUID}}`. The React renderer escapes ordinary text and only accepts safe HTTPS, mailto and site-relative URLs.

## Supabase setup

1. Back up the project database.
2. In the Supabase SQL editor, run `supabase/migrations/20260807000001_blog_automation_v1.sql`, or apply it with the same migration process used for the existing project.
3. Confirm these objects exist:
   - `blog_posts`
   - `blog_images`
   - `blog_post_status`
   - `approve_blog_post`
   - `reject_blog_post`
   - public Storage bucket `blog-images`
4. Confirm an anonymous request can read a published fixture but cannot read an `awaiting_approval` fixture. Remove the fixture afterwards.
5. Regenerate TypeScript types from Supabase when practical. The checked-in types already include the new tables and the previously missing `case_studies` table.

Do not expose the service-role key to the browser. It belongs only in n8n's credential/secret store.

## n8n import and credentials

Import the JSON files in this order from **Workflows → Import from file**:

1. `n8n/workflows/D-approval-publish.json`
2. `n8n/workflows/C-image-intake.json`
3. `n8n/workflows/B-image-request.json`
4. `n8n/workflows/A-blog-writer.json`

They import inactive. Configure and test each one before activating it.

Required secrets/variables are listed in `n8n/config.example.env`:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`
- `N8N_BASE_URL`
- `BLOG_APPROVAL_TOKEN` (a new long random secret known only to Graham/n8n)
- `GOOGLE_DRIVE_FOLDER_ID`

Optional:

- `BLOG_REQUEST_EMAIL`
- `OPENAI_TEXT_MODEL`
- `OPENAI_VISION_MODEL`

Development only:

- `BLOG_IMAGE_REQUEST_MOCK=true` bypasses real Drive folder creation in Workflow B. Never enable it on the production n8n instance.

The exports use HTTP Request nodes for OpenAI and Supabase so they work on n8n installations without extra community nodes. If the n8n host disables environment access in expressions, create native Header Auth credentials for OpenAI and Supabase, assign them to the relevant HTTP Request nodes, and replace the header expressions. Connect a native Google Drive OAuth2 credential to Workflow B's folder node and Workflow C's trigger/download node. Connect a Gmail OAuth2 credential only if email delivery is wanted.

In Workflow C, select the root `EventSound Blog Uploads` folder in the Google Drive Trigger after import. Google Drive trigger versions differ slightly, so confirm `fileCreated` and the watched folder in the n8n editor before activation.

## Create a safe test blog

First run the offline harness:

```powershell
npm run test:blog-lifecycle
```

It simulates the full state sequence, three image analyses, hero selection, draft exclusion, approval, sitemap inclusion and cleanup. It does not contact Supabase or leave a record.

For an n8n/Supabase integration test, call Workflow A's test webhook with:

```json
{
  "topic": "TEST — How to Choose the Right LED Wall Size for a Corporate Event",
  "primary_keyword": "LED wall size corporate event",
  "target_page": "/services/led-video-walls",
  "instructions": "TEST CONTENT ONLY. Do not use real client or venue claims.",
  "test_mode": true
}
```

Workflow A stores `noindex=true` for test-mode input. Confirm its status is `awaiting_images` or `awaiting_approval`, never `published`.

To test Workflow C without Google credentials, call its test webhook with a test post ID and 2–3 image objects. Each must contain a test-only `storage_url`, `original_filename`, and can include a `mock_analysis` object. Set `test_mode=true`. The workflow will bypass OpenAI vision but still store the structured analyses and finish at `awaiting_approval`.

After the integration test, reject and delete the clearly labelled TEST record and its `blog-images/<post-id>/` objects. Do not approve it on production.

## How Graham supplies images

Workflow B creates `EventSound Blog Uploads/<article-slug>/` and returns its Drive link. When Gmail is configured it sends the same request by email; otherwise copy the returned request manually. Graham uploads real EventSound photographs into that article folder. Google Drive is only the drop location. Workflow C copies finished web assets to Supabase Storage.

## Approval and publishing

There are two explicit human paths:

1. Sign in to the existing EventSound admin, open **Blog**, review/edit the article, choose **Approve**, and confirm **Approve and publish**.
2. Send Workflow D a deliberate POST containing `post_id`, `action`, `approved_by`, and the private `approval_token`.

Example request body:

```json
{
  "post_id": "POST_UUID",
  "action": "approve",
  "approved_by": "Graham",
  "approval_token": "YOUR_PRIVATE_TOKEN"
}
```

Rejection uses `"action": "reject"` and an optional `reason`. It does not delete content. The database rejects publication unless the previous status is `awaiting_approval`, and supplies `published_at`/`approved_at` itself.

## Failure recovery

1. Open the failed n8n execution and identify the last successful node.
2. Check the current post and image rows in Supabase before retrying.
3. Workflow C upserts Drive images by `(blog_post_id, drive_file_id)`, so retrying the same Drive upload is safe.
4. If an image upload succeeded but analysis failed, keep the Storage object and rerun intake with that `storage_url` through the manual webhook.
5. If final generation failed, leave or set the post to `building`, correct the failed credential/input, and rerun Workflow C.
6. If approval failed, verify the post is exactly `awaiting_approval`; do not change it directly to `published`.
7. Never work around a failure by weakening RLS, exposing the service-role key, or changing the contact/email pipeline.

## Deployment

After applying the migration and configuring n8n:

1. Run `npm test`.
2. Run `npx tsc -b --pretty false`.
3. Run `npm run lint` and review the documented pre-existing lint failures separately.
4. Run `npm run build` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` available to the sitemap/prerender process if dynamic blog URLs should be generated during that build.
5. Deploy through the existing Netlify process.
6. Verify `/blog`, one published article, its canonical/OG/schema tags, `sitemap.xml`, and a draft URL.

## V2 extension points

V2 can add a friendlier n8n approval form, scheduled editorial calendars, Search Console topic discovery, refresh workflows and richer admin image placement. Keep autonomous publishing, competitor scraping, backlink automation and source-code writing out of the system unless separately designed and approved.


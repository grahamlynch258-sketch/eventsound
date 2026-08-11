# EventSound analytics and consent

## Consent behaviour

- Optional analytics and advertising storage default to denied.
- Google Consent Mode v2 and Microsoft Clarity Consent API v2 receive the saved visitor choice.
- Vendor scripts load only on `eventsound.ie` and `www.eventsound.ie`.
- Vendor scripts do not load for `/admin`, localhost or Netlify deploy previews.
- Contact-form fields are explicitly masked from Clarity.
- Campaign attribution is stored and attached to an enquiry only after analytics or advertising consent.

Visitors can reopen the controls through **Cookie settings** in the website footer.

## Excluding EventSound staff traffic

Open this production URL once on each staff browser/device:

`https://eventsound.ie/?eventsound_internal=1`

The marker is stored locally, the query parameter is removed immediately, and Google/Clarity vendor scripts are not loaded on future visits from that browser profile.

To re-enable normal visitor measurement on that device:

`https://eventsound.ie/?eventsound_internal=0`

## Clarity funnel

Create the enquiry funnel in this order:

1. `cta_click` with `cta_type=quote`
2. `quote_form_view`
3. `quote_form_start`
4. `quote_form_step_complete` with `step=1`
5. `quote_form_step_complete` with `step=2`
6. `quote_form_submit_attempt`
7. `quote_form_submit`

Diagnostic events:

- `quote_form_step_view`
- `quote_form_back`
- `quote_form_validation_error`
- `quote_form_abandon`
- `quote_form_submit_error`

Useful Clarity tags:

- `form_context`
- `step`
- `field_group`
- `cta_type`
- `cta_location`
- `page_path`
- `page_type`
- `service_name`

Do not add customer names, email addresses, phone numbers, organisation names, event messages or other free text to analytics events or tags.

## Reporting segment

For commercial reporting, use Ireland + organic search and exclude `/admin`. Compare mobile and desktop separately and begin the clean baseline from the production deployment timestamp.

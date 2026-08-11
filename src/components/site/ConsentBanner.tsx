import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  applyConsentPreferences,
  isAdminPath,
  isInternalTraffic,
  OPEN_CONSENT_SETTINGS_EVENT,
  readConsentPreferences,
  saveConsentPreferences,
} from "@/lib/consent";

interface DraftPreferences {
  analytics: boolean;
  advertising: boolean;
}
const DENIED: DraftPreferences = { analytics: false, advertising: false };

export function ConsentBanner() {
  const location = useLocation();
  const initial = readConsentPreferences();
  const [open, setOpen] = useState(initial === null);
  const [managing, setManaging] = useState(false);
  const [draft, setDraft] = useState<DraftPreferences>(initial || DENIED);

  useEffect(() => {
    applyConsentPreferences(readConsentPreferences());
  }, []);

  useEffect(() => {
    const showSettings = () => {
      const current = readConsentPreferences();
      setDraft(current || DENIED);
      setManaging(true);
      setOpen(true);
    };

    window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, showSettings);
    return () => window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, showSettings);
  }, []);

  if (!open || isAdminPath(location.pathname) || isInternalTraffic()) return null;

  const save = (preferences: DraftPreferences) => {
    const stored = saveConsentPreferences(preferences);
    applyConsentPreferences(stored);
    setDraft(preferences);
    setOpen(false);
    setManaging(false);
  };

  return (
    <section
      className="fixed inset-x-3 bottom-3 z-[200] mx-auto max-w-3xl rounded-xl border border-accent/30 bg-background/98 p-5 shadow-2xl backdrop-blur-md sm:bottom-5 sm:p-6"
      role="dialog"
      aria-modal="false"
      aria-labelledby="privacy-choices-title"
    >
      <div className="space-y-4">
        <div>
          <h2 id="privacy-choices-title" className="text-lg font-semibold">Your privacy choices</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            We use optional analytics to understand which pages help customers and optional advertising measurement to understand which campaigns generate enquiries. Essential storage keeps the website and your saved choice working.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Read our <Link to="/cookie-policy/" className="text-accent underline underline-offset-2">cookie policy</Link> and <Link to="/privacy-policy/" className="text-accent underline underline-offset-2">privacy policy</Link>.
          </p>
        </div>

        {managing && (
          <div className="grid gap-3 rounded-lg border border-border/60 bg-card/60 p-4 sm:grid-cols-2">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={draft.analytics}
                onChange={(event) => setDraft((current) => ({ ...current, analytics: event.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-input accent-[hsl(var(--accent))]"
              />
              <span>
                <strong className="block text-sm">Analytics</strong>
                <span className="text-xs leading-relaxed text-muted-foreground">Microsoft Clarity helps us understand page use, form progress and usability problems.</span>
              </span>
            </label>
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={draft.advertising}
                onChange={(event) => setDraft((current) => ({ ...current, advertising: event.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-input accent-[hsl(var(--accent))]"
              />
              <span>
                <strong className="block text-sm">Advertising measurement</strong>
                <span className="text-xs leading-relaxed text-muted-foreground">Google Ads helps us measure whether an advert produced a call or quotation request.</span>
              </span>
            </label>
          </div>
        )}

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button type="button" variant="ghost" onClick={() => save(DENIED)}>
            Reject non-essential
          </Button>
          {managing ? (
            <Button type="button" variant="outline" onClick={() => save(draft)}>
              Save choices
            </Button>
          ) : (
            <Button type="button" variant="outline" onClick={() => setManaging(true)}>
              Manage choices
            </Button>
          )}
          <Button type="button" onClick={() => save({ analytics: true, advertising: true })}>
            Accept all
          </Button>
        </div>
      </div>
    </section>
  );
}

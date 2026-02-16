type TrustItem = { value: string; label: string };

const DEFAULT_ITEMS: TrustItem[] = [
  { value: "End-to-End", label: "Full-Service Production" },
  { value: "Expert", label: "Experienced Crew" },
  { value: "100%", label: "Fully Insured" },
  { value: "<24h", label: "Quote Response" },
];

export function TrustBar({ items }: { items?: TrustItem[] }) {
  const safeItems =
    Array.isArray(items) && items.length
      ? items.filter((i) => i?.value && i?.label)
      : DEFAULT_ITEMS;

  // render using safeItems (replace your old hardcoded array usage)
}

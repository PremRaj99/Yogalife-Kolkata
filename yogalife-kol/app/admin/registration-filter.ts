export type RegistrationFields = {
  name: string;
  email: string;
  phone: string;
  eventTitle: string;
  message?: string;
};

// Shared by the registrations table and the CSV export so both match the same rows.
export function matchesRegistration(item: RegistrationFields, query: string) {
  const q = query.trim().toLowerCase();
  return (
    !q ||
    [item.name, item.email, item.phone, item.eventTitle, item.message ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
}

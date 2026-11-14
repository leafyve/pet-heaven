export function filterPets(
  pets,
  { query = "", type = "All", age = "All", savedOnly = false, saved = [] },
) {
  return pets.filter(
    (p) =>
      (type === "All" || p.type === type) &&
      (age === "All" ||
        (age === "Young"
          ? p.age <= 2
          : age === "Adult"
            ? p.age > 2 && p.age < 6
            : p.age >= 6)) &&
      (!savedOnly || saved.includes(p.id)) &&
      `${p.name} ${p.breed} ${p.tag}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
}
export function validate(values, fields) {
  const errors = {};
  for (const f of fields) {
    const v = String(values[f.name] ?? "").trim();
    if (f.required && !v) errors[f.name] = `${f.label} is required.`;
    else if (v && f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      errors[f.name] = "Enter a valid email address.";
    else if (
      v &&
      f.type === "tel" &&
      (!/^\+?[\d\s()-]{8,20}$/.test(v) || v.replace(/\D/g, "").length < 8)
    )
      errors[f.name] = "Enter a valid phone number (at least 8 digits).";
    else if (v && f.minLength && v.length < f.minLength)
      errors[f.name] = `Use at least ${f.minLength} characters.`;
    else if (
      v &&
      f.type === "number" &&
      (!Number.isFinite(Number(v)) ||
        Number(v) < (f.min ?? 0) ||
        Number(v) > (f.max ?? 100))
    )
      errors[f.name] =
        `Enter a number between ${f.min ?? 0} and ${f.max ?? 100}.`;
  }
  return errors;
}
export function requestText(kind, values, pet) {
  return `Pet Heaven — ${kind} request\n${pet ? `Pet: ${pet.name} (${pet.id})\n` : ""}${Object.entries(
    values,
  )
    .map(([k, v]) => `${k}: ${v}`)
    .join(
      "\n",
    )}\n\nThis is a student demonstration request. Staff review is required; submission does not confirm adoption or intake.`;
}
export function downloadText(text, filename, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

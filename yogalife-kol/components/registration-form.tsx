"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { registrationSchema } from "@/lib/registration-schema";
import { Button, Field } from "./ui";

type Errors = Partial<Record<"name" | "email" | "phone" | "message", string>>;

export function RegistrationForm({ eventId }: { eventId: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const values = {
      eventId,
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? ""),
      message: String(form.get("message") ?? ""),
      website: String(form.get("website") ?? ""),
    };
    const parsed = registrationSchema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Errors;
        next[key] ??= issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error);
      setStatus("done");
      toast.success("You're registered. Check your email for confirmation.");
    } catch (error) {
      setStatus("idle");
      toast.error(
        (error as Error).message || "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "done") {
    return (
      <p className="updates-history-note" role="status">
        Thank you for registering. A confirmation email is on its way.
      </p>
    );
  }

  return (
    <form className="registration-form" onSubmit={handleSubmit} noValidate>
      <h3>Register for this event</h3>
      <Field id="reg-name" name="name" label="Full name" autoComplete="name" required error={errors.name} />
      <Field id="reg-email" name="email" type="email" label="Email" autoComplete="email" required error={errors.email} />
      <Field id="reg-phone" name="phone" type="tel" label="Phone" autoComplete="tel" required error={errors.phone} />
      <div className="field">
        <label htmlFor="reg-message">Message (optional)</label>
        <textarea
          id="reg-message"
          name="message"
          className="input"
          rows={3}
          maxLength={500}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "reg-message-error" : undefined}
        />
        {errors.message && (
          <p id="reg-message-error" className="field-error">{errors.message}</p>
        )}
      </div>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="registration-honeypot"
      />
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Registering…" : "Register"}
      </Button>
    </form>
  );
}

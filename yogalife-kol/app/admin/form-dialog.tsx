"use client";

import { useRef, useState, type ReactNode } from "react";
import { PiXThin } from "react-icons/pi";
import { Icon } from "@/components/ui";

// Button that opens a modal form and closes it once the server action succeeds.
export function FormDialog({
  label,
  buttonClass = "secondary-button",
  title,
  submitLabel,
  danger = false,
  action,
  children,
}: {
  label: string;
  buttonClass?: string;
  title: string;
  submitLabel: string;
  danger?: boolean;
  action: (formData: FormData) => Promise<void>;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        className={buttonClass}
        onClick={() => {
          setError("");
          dialogRef.current?.showModal();
        }}
      >
        {label}
      </button>
      <dialog ref={dialogRef} className="admin-dialog" aria-label={title}>
        <form
          ref={formRef}
          action={async (formData) => {
            setPending(true);
            setError("");
            try {
              await action(formData);
              formRef.current?.reset();
              close();
            } catch {
              setError("Something went wrong. Please check the details and try again.");
            } finally {
              setPending(false);
            }
          }}
        >
          <div className="admin-dialog-head">
            <h2>{title}</h2>
            <button type="button" className="icon-button" aria-label="Close" onClick={close}>
              <Icon icon={PiXThin} />
            </button>
          </div>
          {children}
          {error && (
            <p className="field-error" role="alert">
              {error}
            </p>
          )}
          <div className="admin-dialog-actions">
            <button type="button" className="secondary-button" onClick={close}>
              Cancel
            </button>
            <button
              type="submit"
              className={danger ? "button admin-danger" : "button"}
              disabled={pending}
            >
              {pending ? "Please wait…" : submitLabel}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}

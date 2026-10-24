import type { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import type { IconType } from "react-icons";

export function Icon({
  icon: Component,
  size = "md",
}: {
  icon: IconType;
  size?: "sm" | "md";
}) {
  return (
    <Component
      aria-hidden="true"
      className={`icon ${size === "sm" ? "icon-sm" : ""}`}
    />
  );
}
export function Button({
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "soft";
}) {
  return (
    <button
      type={type}
      className={`${variant === "secondary" ? "secondary-button" : `button ${variant === "soft" ? "soft" : ""}`} ${className}`}
      {...props}
    />
  );
}
export function Field({
  label,
  error,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  error?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className="input"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
export function Skeleton({ width = "100%" }: { width?: string }) {
  return <div aria-hidden="true" className="skeleton" style={{ width }} />;
}

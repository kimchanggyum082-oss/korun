"use client";

export const inputClass =
  "h-9 w-full rounded-md border border-neutral-300 bg-white px-2.5 text-[13px] text-ink transition-colors outline-none placeholder:text-neutral-400 hover:border-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:bg-neutral-50 disabled:text-neutral-400";

export const textareaClass =
  "w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-[13px] leading-relaxed text-ink transition-colors outline-none placeholder:text-neutral-400 hover:border-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:bg-neutral-50 disabled:text-neutral-400";

export function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white">
      <header className="border-b border-neutral-100 px-4 py-3">
        <h2 className="text-[13px] font-semibold text-ink">{title}</h2>
        {description && (
          <p className="mt-0.5 text-[12px] text-neutral-500">{description}</p>
        )}
      </header>
      <div className="flex flex-col gap-3 px-4 py-4">{children}</div>
    </section>
  );
}

export function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-[12px] font-semibold text-neutral-600"
      >
        {label}
      </label>
      {children}
      {hint && <p className="text-[11px] text-neutral-400">{hint}</p>}
    </div>
  );
}

export function TextInput(props: React.ComponentProps<"input">) {
  return (
    <input {...props} className={`${inputClass} ${props.className ?? ""}`} />
  );
}

export function TextArea(props: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={`${textareaClass} ${props.className ?? ""}`}
    />
  );
}

export function TwoColumn({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 sm:grid-cols-2">{children}</div>;
}

"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactRoles, type ContactRole } from "@/lib/contact-schema";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  role: ContactRole | "";
  companyName: string;
  message: string;
  honeypot: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("Contact");
  const searchParams = useSearchParams();
  const isAlphaRef = searchParams?.get("ref") === "alpha";

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    role: "",
    companyName: "",
    message: isAlphaRef ? t("alphaRequest.message") : "",
    honeypot: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function validate(): Record<string, string> {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim())
      newErrors.fullName = t("validation.fullNameRequired");
    if (!formData.email.trim())
      newErrors.email = t("validation.emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t("validation.emailInvalid");
    if (!formData.role) newErrors.role = t("validation.roleRequired");
    if (!formData.message.trim())
      newErrors.message = t("validation.messageRequired");
    return newErrors;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-lg border border-success/30 bg-success/5 p-8 text-center"
      >
        <h3 className="text-lg font-semibold text-success">
          {t("success.title")}
        </h3>
        <p className="mt-2 text-success/80">
          {t("success.description")}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {status === "error" && (
        <div role="alert" className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
          <p className="font-medium text-destructive">{t("error.title")}</p>
          <p className="mt-1 text-sm text-destructive">
            {t("error.description")}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={() => setStatus("idle")}
          >
            {t("error.retry")}
          </Button>
        </div>
      )}

      {/* Full Name + Email row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">{t("form.fullName")} *</Label>
          <Input
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder={t("form.fullNamePlaceholder")}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-sm text-destructive">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("form.email")} *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder={t("form.emailPlaceholder")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Phone + Role row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">{t("form.phone")}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("form.phonePlaceholder")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">{t("form.role")} *</Label>
          <select
            id="role"
            name="role"
            required
            value={formData.role}
            onChange={handleChange}
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? "role-error" : undefined}
            className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40"
          >
            <option value="">{t("form.rolePlaceholder")}</option>
            {contactRoles.map((role) => (
              <option key={role} value={role}>
                {t(`form.roles.${role}`)}
              </option>
            ))}
          </select>
          {errors.role && (
            <p id="role-error" className="text-sm text-destructive">{errors.role}</p>
          )}
        </div>
      </div>

      {/* Company Name */}
      <div className="space-y-2">
        <Label htmlFor="companyName">{t("form.companyName")}</Label>
        <Input
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder={t("form.companyNamePlaceholder")}
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message">{t("form.message")} *</Label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          placeholder={t("form.messagePlaceholder")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive">{errors.message}</p>
        )}
      </div>

      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        value={formData.honeypot}
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
        className="absolute opacity-0 w-0 h-0 overflow-hidden pointer-events-none"
        autoComplete="off"
      />

      {/* Submit */}
      <Button
        type="submit"
        data-track="contact-form-submit"
        className="w-full bg-accent text-accent-foreground hover:bg-accent/80"
        size="lg"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? t("form.submitting") : t("form.submit")}
      </Button>
    </form>
  );
}

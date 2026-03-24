import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import messages from "../../messages/en.json";
import heMessages from "../../messages/he.json";

type Props = {
  children: React.ReactNode;
};

function Providers({ children }: Props) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}

function ProvidersHe({ children }: Props) {
  return (
    <NextIntlClientProvider locale="he" messages={heMessages}>
      {children}
    </NextIntlClientProvider>
  );
}

export function renderWithI18n(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: Providers, ...options });
}

export function renderWithI18nHe(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  return render(ui, { wrapper: ProvidersHe, ...options });
}

export { messages };

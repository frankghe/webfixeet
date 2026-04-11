import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "@/test/i18n-helpers";
import { Header } from "@/components/header";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: Record<string, unknown>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
  usePathname: () => "/",
  useRouter: () => ({ replace: vi.fn() }),
}));

vi.mock("next/navigation", () => ({
  useParams: () => ({ locale: "en" }),
}));

describe("Header", () => {
  it("renders logo linking to home", () => {
    renderWithI18n(<Header />);
    // Logo appears in header and potentially in mobile sheet — use getAllBy
    const logoLinks = screen
      .getAllByRole("link", { name: /fixeet/i })
      .filter((el) => el.getAttribute("href") === "/");
    expect(logoLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders desktop navigation links (Home, About, Contact)", () => {
    renderWithI18n(<Header />);
    // Links may be duplicated between desktop nav and mobile sheet
    expect(screen.getAllByRole("link", { name: "Home" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole("link", { name: "Contact" }).length).toBeGreaterThanOrEqual(1);
  });

  it("renders Access the App CTA button on desktop", () => {
    renderWithI18n(<Header />);
    const appElements = screen.getAllByText("Access the App");
    expect(appElements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders inline locale switcher buttons", () => {
    renderWithI18n(<Header />);
    // Inline locale buttons: EN and עב
    const enButtons = screen.getAllByRole("button", { name: "EN" });
    const heButtons = screen.getAllByRole("button", { name: "עב" });
    expect(enButtons.length).toBeGreaterThanOrEqual(1);
    expect(heButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders mobile hamburger menu button with aria-label", () => {
    renderWithI18n(<Header />);
    const menuButtons = screen.getAllByRole("button", { name: "Open menu" });
    expect(menuButtons.length).toBeGreaterThanOrEqual(1);
  });

  it("navigation links have correct hrefs", () => {
    renderWithI18n(<Header />);
    const homeLinks = screen
      .getAllByRole("link", { name: "Home" })
      .filter((el) => el.getAttribute("href") === "/");
    const aboutLinks = screen
      .getAllByRole("link", { name: "About" })
      .filter((el) => el.getAttribute("href") === "/about");
    const contactLinks = screen
      .getAllByRole("link", { name: "Contact" })
      .filter((el) => el.getAttribute("href") === "/contact");

    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("nav link text matches translation keys", () => {
    renderWithI18n(<Header />);
    // Translation values from en.json Navigation namespace
    expect(screen.getAllByText("Home").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("About").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contact").length).toBeGreaterThanOrEqual(1);
  });
});

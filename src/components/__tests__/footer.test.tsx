import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithI18n } from "@/test/i18n-helpers";
import { Footer } from "@/components/footer";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: Record<string, unknown>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Footer", () => {
  it("renders Fixeet logo linking to home", () => {
    renderWithI18n(<Footer />);
    const logoLinks = screen
      .getAllByRole("link", { name: /fixeet/i })
      .filter((el) => el.getAttribute("href") === "/");
    expect(logoLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders navigation links (Home, About, Contact)", () => {
    renderWithI18n(<Footer />);
    const homeLinks = screen.getAllByRole("link", { name: "Home" });
    expect(homeLinks.length).toBeGreaterThanOrEqual(1);
    expect(homeLinks[0]).toHaveAttribute("href", "/");

    const aboutLinks = screen.getAllByRole("link", { name: "About" });
    expect(aboutLinks.length).toBeGreaterThanOrEqual(1);
    expect(aboutLinks[0]).toHaveAttribute("href", "/about");

    const contactLinks = screen.getAllByRole("link", { name: "Contact" });
    expect(contactLinks.length).toBeGreaterThanOrEqual(1);
    expect(contactLinks[0]).toHaveAttribute("href", "/contact");
  });

  it("renders legal links (Privacy Policy, Terms of Service)", () => {
    renderWithI18n(<Footer />);
    const privacyLinks = screen.getAllByRole("link", { name: "Privacy Policy" });
    expect(privacyLinks.length).toBeGreaterThanOrEqual(1);

    const tosLinks = screen.getAllByRole("link", { name: "Terms of Service" });
    expect(tosLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("renders LinkedIn social link with external link attributes", () => {
    renderWithI18n(<Footer />);
    const linkedinLinks = screen.getAllByRole("link", { name: /linkedin/i });
    expect(linkedinLinks.length).toBeGreaterThanOrEqual(1);
    expect(linkedinLinks[0]).toHaveAttribute("href", "https://linkedin.com");
    expect(linkedinLinks[0]).toHaveAttribute("target", "_blank");
    expect(linkedinLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders copyright with current year", () => {
    renderWithI18n(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getAllByText(new RegExp(String(year))).length).toBeGreaterThanOrEqual(1);
  });

  it("navigation column has correct heading", () => {
    renderWithI18n(<Footer />);
    const headings = screen.getAllByRole("heading", { name: "Navigation" });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it("legal column has correct heading", () => {
    renderWithI18n(<Footer />);
    const headings = screen.getAllByRole("heading", { name: "Legal" });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });

  it("social column has correct heading", () => {
    renderWithI18n(<Footer />);
    const headings = screen.getAllByRole("heading", { name: "Social" });
    expect(headings.length).toBeGreaterThanOrEqual(1);
  });
});

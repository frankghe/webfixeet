import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithI18n } from "@/test/i18n-helpers";
import { ContactForm } from "../contact-form";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, children, ...props }: Record<string, unknown>) => (
    <a href={href as string} {...props}>
      {children}
    </a>
  ),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
});

describe("ContactForm", () => {
  it("renders all form fields", () => {
    renderWithI18n(<ContactForm />);

    expect(screen.getAllByLabelText(/full name/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/email/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/phone/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/role/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/company name/i)[0]).toBeInTheDocument();
    expect(screen.getAllByLabelText(/message/i)[0]).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderWithI18n(<ContactForm />);
    expect(
      screen.getAllByRole("button", { name: /send message/i })[0]
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    renderWithI18n(<ContactForm />);

    await user.click(screen.getAllByRole("button", { name: /send message/i })[0]);

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/please select a role/i)).toBeInTheDocument();
    expect(await screen.findByText(/message is required/i)).toBeInTheDocument();
  });

  it("clears error when user types in errored field", async () => {
    const user = userEvent.setup();
    renderWithI18n(<ContactForm />);

    await user.click(screen.getAllByRole("button", { name: /send message/i })[0]);
    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();

    await user.type(screen.getAllByLabelText(/full name/i)[0], "Test User");
    expect(screen.queryByText(/full name is required/i)).not.toBeInTheDocument();
  });

  it("shows success message after successful submission", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    const user = userEvent.setup();
    renderWithI18n(<ContactForm />);

    await user.type(screen.getAllByLabelText(/full name/i)[0], "Test User");
    await user.type(screen.getAllByLabelText(/email/i)[0], "test@example.com");
    await user.selectOptions(
      screen.getAllByLabelText(/role/i)[0],
      "inspector"
    );
    await user.type(screen.getAllByLabelText(/message/i)[0], "Hello");
    await user.click(screen.getAllByRole("button", { name: /send message/i })[0]);

    expect(await screen.findByText(/message sent/i)).toBeInTheDocument();
  });

  it("shows error message after failed submission", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });

    const user = userEvent.setup();
    renderWithI18n(<ContactForm />);

    await user.type(screen.getAllByLabelText(/full name/i)[0], "Test User");
    await user.type(screen.getAllByLabelText(/email/i)[0], "test@example.com");
    await user.selectOptions(
      screen.getAllByLabelText(/role/i)[0],
      "inspector"
    );
    await user.type(screen.getAllByLabelText(/message/i)[0], "Hello");
    await user.click(screen.getAllByRole("button", { name: /send message/i })[0]);

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("honeypot field is hidden", () => {
    renderWithI18n(<ContactForm />);

    const honeypot = document
      .querySelector('input[name="honeypot"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot?.getAttribute("aria-hidden")).toBe("true");
  });
});

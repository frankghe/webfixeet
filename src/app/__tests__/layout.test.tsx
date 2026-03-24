import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RootLayout from "../layout";

describe("Root layout", () => {
  it("renders children directly without html/body wrapper", () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">Hello</div>
      </RootLayout>
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
    // Root layout should NOT render html or body tags (those are in [locale]/layout.tsx)
    expect(container.querySelector("html")).toBeNull();
  });
});

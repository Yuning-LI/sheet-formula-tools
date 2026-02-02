import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "../app/page";

describe("Excel Formula Generator", () => {
  it("renders H1 and input", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", {
        name: "Free AI Excel Formula Generator & Google Sheets Helper",
      })
    ).toBeTruthy();
    expect(
      screen.getByPlaceholderText("e.g., Sum column A if B is Sales")
    ).toBeTruthy();
  });

  it("shows loading state on generate", async () => {
    render(<Home />);
    const textarea = screen.getByPlaceholderText(
      "e.g., Sum column A if B is Sales"
    );
    fireEvent.change(textarea, { target: { value: "Sum A" } });

    let resolveFetch: (value: unknown) => void = () => {};
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    global.fetch = vi.fn(() => fetchPromise as Promise<Response>) as unknown as typeof fetch;

    const button = screen.getByRole("button", { name: "Generate Formula" });
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: "Generating..." })
    ).toBeTruthy();

    resolveFetch({
      ok: true,
      json: async () => ({ formula: "=SUM(A:A)" }),
    });

    await waitFor(() => expect(screen.getByText("=SUM(A:A)")).toBeTruthy());
  });

  it("renders result from API", async () => {
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ({ formula: "=SUM(A:A)" }),
    })) as unknown as typeof fetch;

    render(<Home />);
    fireEvent.change(
      screen.getByPlaceholderText("e.g., Sum column A if B is Sales"),
      { target: { value: "Sum A" } }
    );
    fireEvent.click(screen.getByRole("button", { name: "Generate Formula" }));

    await waitFor(() => expect(screen.getByText("=SUM(A:A)")).toBeTruthy());
  });
});

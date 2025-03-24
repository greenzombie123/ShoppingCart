import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Carousel from "../components/Carousel";
import App from "../App";
import routes from "../routes";

describe("Carousel", () => {
  it("renders buttons on the screen", async () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    const buttons = await waitFor(() => screen.getAllByRole("button"));

    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
  });

  // it()
});

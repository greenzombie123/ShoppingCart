import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";
import { CartIcon } from "../components/Header";

describe("Header component", () => {
  HTMLElement.prototype.scrollIntoView = vi.fn()

  it("renders links correctly", async() => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const links = await waitFor(()=>screen.getAllByRole("link"))

    expect(links[0].textContent).toBe("Buy Stuff");
    expect(links[1].textContent).toBe("Electronics");
    expect(links[2].textContent).toBe("Jewelry");
    expect(links[3].textContent).toBe("Men's Clothing");
    expect(links[4].textContent).toBe("Women's Clothing");

    expect(screen.getByRole("banner")).toMatchSnapshot();
    expect(screen).toMatchSnapshot();
  });

    it("menuIcon renders", async () => {
      const router = createMemoryRouter(routes, {
        initialEntries: ["/"],
        initialIndex: 0,
      });

      render(<RouterProvider router={router} />);

      const menuIcon = await screen.findByTestId("menuIcon");
      expect(menuIcon).toBeInTheDocument();
      expect(menuIcon).toBeInTheDocument()
    });
});

describe("CartIcon",  () => {
  it("Renders on the screen with a five", async () => {
    const routes = [{ path: "/", element: <CartIcon number={5} /> }];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const cartIcon = await screen.findByRole("link");
    const numberText = await screen.findByText(5);

    expect(cartIcon).toBeInTheDocument();
    expect(numberText).toBeInTheDocument();
  });
});

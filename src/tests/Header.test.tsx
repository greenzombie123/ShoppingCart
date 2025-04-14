import { findByText, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import routes from "../routes";
import Header, { CartIcon } from "../components/Header";
import { renderWithRouter } from "../utilities/testulit";
import { Cart } from "../products";

describe("Header component", () => {
  HTMLElement.prototype.scrollIntoView = vi.fn();

  it("renders links correctly", async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const links = await waitFor(() => screen.getAllByRole("link"));

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
    expect(menuIcon).toBeInTheDocument();
  });

  it("renders a CartIcon with the number 5", async () => {
    const cart: Cart = [
      {
        name: "Maggie Lo Blouse",
        id: 13,
        price: 39.99,
        style: "Black",
        picture: "/images/brownblouse.jpg",
        quantity: 4,
      },
      {
        id: 14,
        name: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        style: undefined,
        picture: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        quantity: 1,
      },
    ];

    const route = {
      element: <Header />,
      path: "/",
      loader: () => cart,
    };

    renderWithRouter(route);
    const cartIconNumber = await screen.findByText("5")
    expect(cartIconNumber).toBeInTheDocument()

  });
});

describe.skip("CartIcon", () => {
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

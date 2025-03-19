import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";
import { CartIcon } from "../components/Header";

describe("Header component", () => {
  it("renders links correctly", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const links = screen.getAllByRole("link");

    expect(links[0].textContent).toBe("Buy Stuff");
    expect(links[1].textContent).toBe("Electronics");
    expect(links[2].textContent).toBe("Jewelry");
    expect(links[3].textContent).toBe("Men's Clothing");
    expect(links[4].textContent).toBe("Women's Clothing");

    expect(screen.getByRole("banner")).toMatchSnapshot();
  });

  it("menuIcon renders", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const menuIcon = screen.getByTestId("menuIcon");

    expect(menuIcon).toBeInTheDocument();
  });
});

describe("CartIcon", () => {
  it("Renders on the screen with a five", () => {
    const routes = [{ path: "/", element:<CartIcon number={5}/> }];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
      initialIndex: 0,
    });

    render(<RouterProvider router={router} />);

    const cartIcon = screen.getByRole("link")

    expect(cartIcon).toBeInTheDocument()
    
    const numberText = screen.getByText(5)

    expect(numberText).toBeInTheDocument()


  });
});

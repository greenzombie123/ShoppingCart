import { describe, expect, it } from "vitest";
import ShoppingCart from "../components/ShoppingCart";
import { mockCart, renderWithRouter } from "../utilities/testulit";
import { findByRole, screen } from "@testing-library/dom";
import {
  createMemoryRouter,
  RouteObject,
  RouteProps,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { act, render } from "@testing-library/react";

describe("ShoppingCart", () => {
  it("renders cart item", async () => {
    const route = {
      element: <ShoppingCart />,
      path: "/",
      loader: () => mockCart,
    };

    renderWithRouter(route);

    const images = (await screen.findAllByRole("img")) as HTMLImageElement[];
    const cartItem1Name = await screen.findByText("LBJ Boom Box");
    const cartItem1Style = await screen.findByText("Red");
    const cartItem1Quantity = await screen.findByText("2");
    const cartItem1Price = await screen.findByText("$119.98");
    const imgSrc = /\/images\/redjbl-boombox.jpe/;

    expect(cartItem1Name).toBeInTheDocument();
    expect(cartItem1Style).toBeInTheDocument();
    expect(cartItem1Quantity).toBeInTheDocument();
    expect(cartItem1Price).toBeInTheDocument();
    if (images[0]) expect(imgSrc.test(images[0].src)).toBe(true);
  });

  it("is rendered when the cart icon is clicked", async () => {
    const route: RouteObject[] = [
      {
        element: <App />,
        path: "/",
        loader: () => mockCart,
        children: [
          {
            element: <ShoppingCart />,
            path: "/mycart",
            loader: () => mockCart,
          },
          {
            element: <div>Mock</div>,
            index: true,
          },
        ],
      },
    ];
    const user = userEvent.setup();
    const router = createMemoryRouter(route);
    render(<RouterProvider router={router} />);

    const cartIcon = await screen.findByRole("link", { name: "cartIcon" });
    await user.click(cartIcon);

    const cartItem1Name1 = await screen.findByText("LBJ Boom Box");
    expect(cartItem1Name1).toBeInTheDocument();

    const cartItem1Name2 = await screen.findByText("Maggie Lo Blouse");
    expect(cartItem1Name2).toBeInTheDocument();
  });

  it("renders a quantity counter that shows the quantity of a cart item", async ()=>{
    const route = {
        element: <ShoppingCart />,
        path: "/",
        loader: () => ([{
          name: "LBJ Boom Box",
          id: 12,
          price: 59.99,
          style: "Red",
          picture: "/images/redjbl-boombox.jpeg",
          quantity: 10,
        }]),
      };
  
      const { findByRole } = renderWithRouter(route);
      
      const increaseButton = (await findByRole("button", {
        name: "Increase quantity",
      })) as HTMLButtonElement;

      const decreaseButton = (await findByRole("button", {
        name: "Decrease quantity",
      })) as HTMLButtonElement;

      const quantityCounter = await findByRole("status");
  
      expect(quantityCounter.textContent).toBe("10");
      expect(increaseButton).toBeInTheDocument()
      expect(decreaseButton).toBeInTheDocument()
  })

  it.skip("changes quantity of cart items to 2 when quantity counter is clicked", async () => {
    const route = {
      element: <ShoppingCart />,
      path: "/",
      loader: () => ({
        name: "LBJ Boom Box",
        id: 12,
        price: 59.99,
        style: "Red",
        picture: "/images/redjbl-boombox.jpeg",
        quantity: 2,
      }),
    };

    const { user, findByRole } = renderWithRouter(route);
    const increaseButton = (await findByRole("button", {
      name: "Increase quantity",
    })) as HTMLButtonElement;
    const quantityCounter = await findByRole("status");

    act(() => {
      user.click(increaseButton);
    });

    expect(quantityCounter.textContent).toBe(3);
  });
});

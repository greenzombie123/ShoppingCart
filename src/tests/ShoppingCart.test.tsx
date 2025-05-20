import { beforeAll, describe, expect, it, vi } from "vitest";
import ShoppingCart, { ViewedItemsContainer } from "../components/ShoppingCart";
import {
  mockCart,
  mockProducts,
  renderWithRouter,
  RouteObjectProps,
} from "../utilities/testulit";
import { fireEvent, screen, waitFor } from "@testing-library/dom";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import { addToCart } from "../Loaders";
import url from "node:url";

beforeAll(() => {
  globalThis.URLSearchParams =
    url.URLSearchParams as typeof globalThis.URLSearchParams;
});

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

  it("renders a quantity counter that shows the quantity of a cart item", async () => {
    const route = {
      element: <ShoppingCart />,
      path: "/",
      loader: () => [
        {
          name: "LBJ Boom Box",
          id: 12,
          price: 59.99,
          style: "Red",
          picture: "/images/redjbl-boombox.jpeg",
          quantity: 10,
        },
      ],
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
    expect(increaseButton).toBeInTheDocument();
    expect(decreaseButton).toBeInTheDocument();
  });

  it("changes quantity of cart items to 2 when quantity counter is clicked", async () => {
    const route = {
      element: <ShoppingCart />,
      path: "/",
      loader: () => [
        {
          name: "LBJ Boom Box",
          id: 12,
          price: 59.99,
          style: "Red",
          picture: "/images/redjbl-boombox.jpeg",
          quantity: 2,
        },
      ],
    };

    const { user, findByRole } = renderWithRouter(route);
    const increaseButton = (await findByRole("button", {
      name: "Increase quantity",
    })) as HTMLButtonElement;
    const quantityCounter = await findByRole("status");

    await waitFor(async () => {
      await user.click(increaseButton);
    });

    expect(quantityCounter.textContent).toBe("3");

    await waitFor(async () => {
      await user.click(increaseButton);
    });

    expect(quantityCounter.textContent).toBe("4");
  });

  it("renders a popup confirming if you want to remove cart when remove button is clicked", async () => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();

    const route = {
      element: <ShoppingCart />,
      path: "/",
      loader: () => [
        {
          name: "LBJ Boom Box",
          id: 12,
          price: 59.99,
          style: "Red",
          picture: "/images/redjbl-boombox.jpeg",
          quantity: 2,
        },
      ],
    };

    const { user, findByRole } = renderWithRouter(route);

    const removeButton = (await findByRole("button", {
      name: "remove Cartitem Button",
    })) as HTMLButtonElement;

    await user.click(removeButton);

    expect(HTMLDialogElement.prototype.showModal).toBeCalled();

    vi.resetAllMocks();
  });

  it.skip("removes the cart item from server when ok button of cart popup is clicked", async () => {
    const mockAction = vi.fn();

    const route = {
      element: <ShoppingCart />,
      path: "/mycart",
      loader: () => [
        {
          name: "LBJ Boom Box",
          id: 12,
          price: 59.99,
          style: "Red",
          picture: "/images/redjbl-boombox.jpeg",
          quantity: 2,
        },
      ],
      action: mockAction,
    };

    const user = userEvent.setup();

    const { findByRole } = render(
      <RouterProvider
        router={createMemoryRouter([route], { initialEntries: ["/mycart"] })}
      />
    );

    const removeButton = (await findByRole("button", {
      name: "remove Cartitem Button",
    })) as HTMLButtonElement;

    await waitFor(async () => {
      await user.click(removeButton);
    });

    const dialog = await findByRole("dialog", { hidden: true });
    const okButton = dialog.querySelector("button") as HTMLButtonElement;

    await user.click(okButton);

    // expect(mockAction).toBeCalled()
  });

  it("renders the viewed items container", async () => {
    const viewedItemsRoute: RouteObjectProps = {
      element: <ViewedItemsContainer />,
      path: "/",
      loader: () => mockProducts,
    };

    const { findAllByRole } = renderWithRouter(viewedItemsRoute);

    const links = (await findAllByRole("link")) as HTMLImageElement[];

    expect(links.length).toBe(4);
  });

  it("calls addToCart", async () => {

   const mockAction = vi.hoisted(()=>vi.fn())

   const mockAction2 = vi.fn()

    vi.mock("../Loaders.ts", async ()=>{
      const originalModule = await vi.importActual("../Loaders.ts")

      return {
        ...originalModule,
       addToCart:mockAction
      }
    })

    const route: RouteObjectProps = {
      element: <ShoppingCart />,
      path: "/mycart",
      loader: () => mockCart,
      action: () => mockAction2(),
      children: [
        {
          element: <ViewedItemsContainer />,
          loader: () => mockProducts,
          index: true,
          action: addToCart,
        },
      ],
    };

    const { user, findAllByRole, container } = renderWithRouter(route);      

    const addToCartButtons = (await findAllByRole("button", {
      name: "Add to Cart",
    })) as HTMLButtonElement[];

    const firstAddToCartButton = addToCartButtons[0];

    await user.click(firstAddToCartButton);

    expect(mockAction).toBeCalled()
    expect(container).toMatchSnapshot();
  });
});

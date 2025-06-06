import { beforeAll, describe, expect, it, vi } from "vitest";
import ShoppingCart, { ViewedItemsContainer } from "../components/ShoppingCart";
import {
  mockCart,
  mockGetEmptyCart,
  mockGetOneViewedItem,
  mockOneCartItem,
  mockProducts,
  renderWithRouter,
  RouteObjectProps,
} from "../utilities/testulit";
import {
  screen,
  waitFor,
  within,
} from "@testing-library/dom";
import {
  ActionFunction,
  ActionFunctionArgs,
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import url from "node:url";
import { Cart, CartItem, Product } from "../products";

beforeAll(() => {
  globalThis.URLSearchParams =
    url.URLSearchParams as typeof globalThis.URLSearchParams;

  vi.resetModules();
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
    const mockCartItem: CartItem = {
      name: "LBJ Boom Box",
      id: "ff",
      price: 59.99,
      style: "Red",
      picture: "/images/redjbl-boombox.jpeg",
      quantity: 2,
      product: {} as Product,
    };

    const route = {
      element: <ShoppingCart />,
      path: "/",
      loader: () => [mockCartItem],
    };

    const { user, findByRole } = renderWithRouter(route);
    const increaseButton = (await findByRole("button", {
      name: "Increase quantity",
    })) as HTMLButtonElement;
    const quantityCounter = await findByRole("status");

    await user.click(increaseButton);

    expect(quantityCounter.textContent).toBe("3");

    await user.click(increaseButton);

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

  it("removes a cartItem when remove button is pressed", async () => {
    const firstLoaderCall = () => [mockOneCartItem];
    const secondLoaderCall = () => [];

    const mockLoader = vi
      .fn()
      .mockImplementationOnce(firstLoaderCall)
      .mockImplementationOnce(secondLoaderCall);

    const route: RouteObjectProps = {
      element: <ShoppingCart />,
      path: "/mycart",
      loader: mockLoader,
      action: () => {},
    };

    const { user, findByRole, findByText } =
      renderWithRouter(route);

    expect(
      await findByText("Jupopo AirFlex Running Shoes")
    ).toBeInTheDocument();

    const removeButton = (await findByRole("button", {
      name: "remove Cartitem Button",
    })) as HTMLButtonElement;

    await user.click(removeButton);

    const dialog = (await findByRole("dialog", {
      hidden: true,
    })) as HTMLDialogElement;

    expect(dialog).not.toBeVisible();

    const dialogButtons = dialog.querySelectorAll("button");

    await user.click(dialogButtons[0]);

    const cart = await findByRole("cart");

    expect( within(cart).queryByText("Jupopo AirFlex Running Shoes")).not.toBeInTheDocument()
  });

  it("removes only one cartItem when remove button is pressed", async () => {
    const mockTwoCartItem = {...mockOneCartItem, id:"fe", name:"Red Boots"}
    const firstLoaderCall = ():Cart => [mockOneCartItem, mockTwoCartItem];
    const secondLoaderCall = () => [mockTwoCartItem];

    const mockLoader = vi
      .fn()
      .mockImplementationOnce(firstLoaderCall)
      .mockImplementationOnce(secondLoaderCall);

    const route: RouteObjectProps = {
      element: <ShoppingCart />,
      path: "/mycart",
      loader: mockLoader,
      action: () => {},
    };

    const { user, findByRole, findAllByRole,findByText, queryByText } =
      renderWithRouter(route);

    expect(
      await findByText("Jupopo AirFlex Running Shoes")
    ).toBeInTheDocument();

    expect(
      await findByText("Red Boots")
    ).toBeInTheDocument();

    const removeButtons = (await findAllByRole("button", {
      name: "remove Cartitem Button",
    })) as HTMLButtonElement[];

    await user.click(removeButtons[0]);

    const dialog = (await findByRole("dialog", {
      hidden: true,
    })) as HTMLDialogElement;

    const dialogButtons = dialog.querySelectorAll("button");

    await user.click(dialogButtons[0]);

     const cart = await findByRole("cart");

    expect( within(cart).queryByText("Jupopo AirFlex Running Shoes")).not.toBeInTheDocument()
    expect(queryByText("Red Boots")).toBeInTheDocument()
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
    vi.doMock(import("../Loaders.ts"), async (mod) => {
      const originalModule = await mod();

      return {
        ...originalModule,
        addToCart: vi.fn(),
      };
    });

    const { addToCart } = await import("../Loaders.ts");

    const route: RouteObjectProps = {
      element: <ShoppingCart />,
      path: "/mycart",
      loader: () => mockCart,
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

    expect(addToCart).toBeCalled();

    const secondAddToCartButton = addToCartButtons[1];

    await user.click(secondAddToCartButton);

    expect(addToCart).toBeCalledTimes(2);
    expect(container).toMatchSnapshot();
  });

  it("sends the product data to addToCart when add to cart button on a viewedItem is pressed", async () => {
    vi.doUnmock("../Loaders.ts");
    const { addToCart } = await import("../Loaders.ts");
    const spy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({ ok: true } as Response);

    vi.mock(import("../utilities/utility"), async (module) => {
      const mod = await module();

      return {
        ...mod,
        createCartItemId: () => "123",
      };
    });

    const mockViewedItem: Product = {
      name: "Jupopo AirFlex Running Shoes",
      id: 7,
      category: "Men's Clothing",
      price: 89.99,
      ratings: 198,
      stars: 4,
      likes: 431,
      styles: [
        {
          description: "blue",
          picture: "/images/ID3692_HM5.avif",
          isCurrentStyle: true,
        },
      ],
    };

    const mockCartItem: CartItem = {
      name: "Jupopo AirFlex Running Shoes",
      price: 89.99,
      id: "123",
      quantity: 1,
      style: "blue",
      picture: "/images/ID3692_HM5.avif",
      product: mockViewedItem,
    };

    const route: RouteObjectProps = {
      element: <ShoppingCart />,
      path: "/mycart",
      loader: () => mockCart,
      action: () => {},
      children: [
        {
          element: <ViewedItemsContainer />,
          loader: () => [mockViewedItem],
          index: true,
          action: addToCart,
        },
      ],
    };

    const { user, findAllByRole } = renderWithRouter(route);

    const addToCartButtons = (await findAllByRole("button", {
      name: "Add to Cart",
    })) as HTMLButtonElement[];

    const firstAddToCartButton = addToCartButtons[0];

    await user.click(firstAddToCartButton);

    expect(spy).toBeCalled();
    expect(spy).toBeCalledWith("http://localhost:3000/cart", {
      method: "POST",
      body: JSON.stringify({ ...mockCartItem, id: "123" }),
    });
  });

  it("renders PopUp when the add to cart button on a viewed item is clicked", async () => {
    const mockShowModal = vi.fn();
    const mockAction = vi.fn();

    HTMLDialogElement.prototype.showModal = mockShowModal;

    const route: RouteObjectProps = {
      element: <ShoppingCart />,
      path: "/mycart",
      loader: mockGetEmptyCart,
      action: () => console.log("WHAT!?"),
      children: [
        {
          element: <ViewedItemsContainer />,
          loader: mockGetOneViewedItem,
          index: true,
          action: mockAction,
        },
      ],
    };

    const { user, findByRole } = renderWithRouter(route);

    const addToCartButtons = (await findByRole("button", {
      name: "Add to Cart",
    })) as HTMLButtonElement;

    const firstAddToCartButton = addToCartButtons;

    await user.click(firstAddToCartButton);

    await waitFor(() => expect(mockAction).toBeCalled);
  });

  it("removes a cartitem when you press the remove button on both the cartitem and the dialog button", async ()=>{
    const mockTwoCartItem = {...mockOneCartItem,  id:"mmm"}
    const mockCartItems:Cart = [mockOneCartItem, mockTwoCartItem]
    const mockFirstLoaderCall = ()=>mockCartItems
    const mockSecondLoaderCall = ()=>[mockTwoCartItem]
    const mockLoader = vi.fn().mockImplementationOnce(mockFirstLoaderCall).mockImplementationOnce(mockSecondLoaderCall)

    const spy = vi.spyOn(globalThis, "fetch")

    const {updateCart} = await import("../Loaders.ts")

    const route:RouteObjectProps = {
      element: <ShoppingCart />,
      path: "/mycart",
      loader: mockLoader,
      action:updateCart,
    }

    const { user, findByRole, findAllByRole,findByText, queryByText, queryAllByText, findAllByText } =
      renderWithRouter(route);

    expect(
      (await findAllByText(mockOneCartItem.name)).length
    ).toBe(2)

    const removeButtons = (await findAllByRole("button", {
      name: "remove Cartitem Button",
    })) as HTMLButtonElement[];

    await user.click(removeButtons[0]);

    const dialog = (await findByRole("dialog", {
      hidden: true,
    })) as HTMLDialogElement;

    const dialogButtons = dialog.querySelectorAll("button");

    await user.click(dialogButtons[0]);

    expect(spy.mock.calls[0]).toEqual([`http://localhost:3000/cart/${mockOneCartItem.id}`, {method:"DELETE"}] )
    expect(spy.mock.calls[1]).toEqual([`http://localhost:3000/cart/${mockTwoCartItem.id}`, {method:"DELETE"}] )
    expect(spy.mock.calls[2]).toEqual([`http://localhost:3000/cart`, {method:"POST", body:JSON.stringify(mockTwoCartItem)}] )
    expect(spy.mock.calls[3]).toEqual(undefined)

     const cart = await findByRole("cart");

    expect( within(cart).queryAllByText(mockOneCartItem.name).length).toBe(1)
  })
});

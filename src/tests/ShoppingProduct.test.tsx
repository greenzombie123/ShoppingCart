import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  Mock,
  test,
  vi,
} from "vitest";
import { Cart, Product } from "../products";
import {
  BrowserRouter,
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import ShoppingProduct, {
  PopUp,
  ProductDetails,
  ProductToCart,
} from "../components/ShoppingProduct";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import storePageStyle from "../components/ShoppingProduct.module.css";
import { renderWithRouter } from "../utilities/testulit";
import routes from "../routes";
import * as ReactRouter from "react-router-dom";
import { ReactNode } from "react";

const product: Product = {
  id: 1,
  name: "polo shirt",
  price: 2314,
  ratings: 334,
  stars: 2,
  likes: 380,
  category: "Men's Clothing",
  styles: [
    {
      description: "black",
      picture: "/images/poloshirtblack.webp",
      isCurrentStyle: true,
    },
    {
      description: "blue",
      picture: "/images/bluepoloshirt.jpg",
      isCurrentStyle: false,
    },
  ],
};

const emptyCart: Cart = [];
const productsURL = "http://localhost:3000/products";
const cartURL = "http://localhost:3000/cart";
const menClothingURL = "http://localhost:3000/products?category=Men's Clothing";
const shoppingProductRoute: RouteObject = {
  path: "/product/:id",
  element: <ShoppingProduct />,
};

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = vi.fn();

  vi.spyOn(global, "fetch").mockImplementation(
    vi.fn((url: string) => {
      const values =
        url === productsURL
          ? product
          : cartURL === url
          ? emptyCart
          : // : url === menClothingURL
            // ? menClothingProducts
            null;
      if (!values) throw new Error("Couldn't process url string");
      return Promise.resolve({
        json: () => Promise.resolve(values),
      });
    }) as Mock
  );

  const mock = vi.hoisted(() => ({
    useLocation: vi.fn(() => ({
      state: product,
    })),
  }));

  vi.mock("react-router-dom", async () => {
    const routerData = await vi.importActual("react-router-dom");

    return {
      ...routerData,
      useLocation: mock.useLocation,
    };
  });
});

afterAll(() => {
  vi.resetAllMocks();
});

describe("ShoppingProduct", () => {
  it("renders the product's image", async () => {
    const router = createMemoryRouter([shoppingProductRoute], {
      initialEntries: ["/product/:id"],
      initialIndex: 0,
    });
    render(<RouterProvider router={router} />);

    const img = (await waitFor(() =>
      screen.getByAltText("polo shirt black")
    )) as HTMLImageElement;

    expect(img.src).toBe("http://localhost:3000/images/poloshirtblack.webp");
    expect(img).toMatchSnapshot();
  });

  it("renders style buttons", async () => {
    renderWithRouter({ element: <ShoppingProduct /> });

    const firstStyleButton = (await waitFor(() =>
      screen.getByRole("button", { name: "black" })
    )) as HTMLButtonElement;

    const secondStyleButton = (await waitFor(() =>
      screen.getByRole("button", { name: "blue" })
    )) as HTMLButtonElement;

    expect(firstStyleButton).toBeInTheDocument();
    expect(secondStyleButton).toBeInTheDocument();
  });

  test("change picture when a color tab button is pushed", async () => {
    // const user = userEvent.setup();

    // render(<ShoppingProduct />, { wrapper: BrowserRouter });

    const { user } = renderWithRouter({
      element: <ShoppingProduct />,
      path: "/product/1",
    });

    const secondStyleButton = (await waitFor(() =>
      screen.getByRole("button", { name: "blue" })
    )) as HTMLButtonElement;

    await user.click(secondStyleButton);

    const img = (await screen.findByRole("img", {
      name: "picture",
    })) as HTMLImageElement;

    expect(img.src).toBe("http://localhost:3000/images/bluepoloshirt.jpg");
  });
});

describe("ProductDetails", () => {
  it("renders info about the product", async () => {
    render(<ProductDetails product={product} />, { wrapper: BrowserRouter });

    const name = await screen.findByText("polo shirt");
    const price = await screen.findByText("$23.14");
    const stars = (await screen.findAllByRole("img", { name: "star" })).filter(
      (star) => star.classList.contains(storePageStyle.on)
    );
    const rating = await screen.findByText("(334)");
    const style = await screen.findByText("Style: black");

    expect(name.textContent).toBe("polo shirt");
    expect(price.textContent).toBe("$23.14");
    expect(stars.length).toBe(2);
    expect(rating.textContent).toBe("(334)");
    expect(style.textContent).toBe("Style: black");
  });
});

describe("ProductToCart", () => {
  it("increase quantity by one if increase button of quantity counter is clicked", async () => {
    const user = userEvent.setup();

    render(<ProductToCart product={product} />);

    const button = (await screen.findByRole("button", {
      name: "Increase quantity",
    })) as HTMLButtonElement;

    await user.click(button);

    const quantityLabel = await screen.findByRole("status");

    expect(quantityLabel.textContent).toBe("2");
  });

  it("decrease quantity by one if decrease button of quantity counter is clicked", async () => {
    const user = userEvent.setup();

    render(<ProductToCart product={product} />);

    const button1 = (await screen.findByRole("button", {
      name: "Increase quantity",
    })) as HTMLButtonElement;
    const button2 = (await screen.findByRole("button", {
      name: "Decrease quantity",
    })) as HTMLButtonElement;

    await user.click(button1);
    await user.click(button2);

    const quantityLabel = await screen.findByRole("status");

    expect(quantityLabel.textContent).toBe("1");
  });

  it("does not decrease quantity by one if decrease button of quantity counter is clicked if quantity if one", async () => {
    const user = userEvent.setup();

    render(<ProductToCart product={product} />);

    const button = (await screen.findByRole("button", {
      name: "Decrease quantity",
    })) as HTMLButtonElement;

    await user.click(button);

    const quantityLabel = await screen.findByRole("status");

    expect(quantityLabel.textContent).not.toBe("0");
  });

  it("renders a pop up when the add to cart button is clicked", async () => {});
});

describe("PopUp", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  it("renders when given a certain prop", async () => {
    const data = { ok: true };
    const status = "idle";

    render(<PopUp cartItem={null} status={status} data={data} />);

    expect(HTMLDialogElement.prototype.showModal).toBeCalled();
    expect(HTMLDialogElement.prototype.showModal).not.toBeCalledTimes(2);
  });

  it("closes when button is pressed", async () => {
    const data = { ok: true };
    const status = "idle";

    const user = userEvent.setup();

    act(() => {
      render(<PopUp cartItem={null} status={status} data={data} />);
    });

    const dialog = await screen.findByRole("dialog", { hidden: true });

    const button = await dialog.querySelector("button");

    if (button) await user.click(button);

    expect(HTMLDialogElement.prototype.close).toBeCalled()
    expect(HTMLDialogElement.prototype.close).not.toHaveBeenCalledTimes(2)
  });
});

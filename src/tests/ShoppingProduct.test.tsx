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
import { BrowserRouter, RouteObject } from "react-router-dom";
import ShoppingProduct, { ProductDetails } from "../components/ShoppingProduct";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import storePageStyle from "../components/StorePage.module.css";

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
    // const router = createMemoryRouter([shoppingProductRoute]);
    render(<ShoppingProduct />, { wrapper: BrowserRouter });

    const img = (await waitFor(() =>
      screen.getByAltText("polo shirt black")
    )) as HTMLImageElement;

    expect(img.src).toBe("http://localhost:3000/images/poloshirtblack.webp");
    expect(img).toMatchSnapshot();
  });

  it("renders style buttons", async () => {
    render(<ShoppingProduct />, { wrapper: BrowserRouter });

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
    const user = userEvent.setup();

    render(<ShoppingProduct />, { wrapper: BrowserRouter });

    const secondStyleButton = (await waitFor(() =>
      screen.getByRole("button", { name: "blue" })
    )) as HTMLButtonElement;

    await user.click(secondStyleButton);

    const img = (await screen.findByRole("img", {name:"picture"})) as HTMLImageElement;

    expect(img.src).toBe("http://localhost:3000/images/bluepoloshirt.jpg");
  });
});

describe("ProductDetails", () => {
  it("renders info about the product", async () => {
    render(<ProductDetails product={product}/>, { wrapper: BrowserRouter });

    const name = await screen.findByText("polo shirt");
    const price = await screen.findByText("$23.14");
    const stars = (await screen.findAllByRole("img", { name: "star" })).filter(
      (star) => star.classList.contains(storePageStyle.on)
    );
    const rating = await screen.findByText("(334)");
    const style = await screen.findByText("Style: black");
  

    expect(name.textContent).toBe("polo shirt")
    expect(price.textContent).toBe("$23.14")
    expect(stars.length).toBe(2)
    expect(rating.textContent).toBe("(334)")
    expect(style.textContent).toBe("Style: black")
});
});

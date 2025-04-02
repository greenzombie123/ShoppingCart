import { afterAll, beforeAll, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { Cart, Product } from "../products";
import {
  BrowserRouter,
  RouteObject,
} from "react-router-dom";
import ShoppingProduct from "../components/ShoppingProduct";
import { render, screen, waitFor } from "@testing-library/react";
import React from "react";

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
//   const menClothingProducts = [products[0], products[2]];
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
      screen.getByRole("img")
    )) as HTMLImageElement;

    expect(img.src).toBe("http://localhost:3000/images/poloshirtblack.webp");
    expect(img).toMatchSnapshot();
  });
});

import { afterAll, beforeAll, describe, expect, it, Mock, vi } from "vitest";
import { Cart, Product } from "../products";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import StorePage from "../components/StorePage";
import { render, screen, waitFor } from "@testing-library/react";
import routes from "../routes";
import App from "../App";
import userEvent from "@testing-library/user-event";

const products: Product[] = [
  {
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
  },
  {
    id: 1,
    name: "polo shirta",
    price: 2314,
    ratings: 334,
    stars: 5,
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
  },
  {
    id: 1,
    name: "polo shirtb",
    price: 2314,
    ratings: 334,
    stars: 5,
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
  },
  {
    id: 1,
    name: "polo shirtc",
    price: 2314,
    ratings: 334,
    stars: 5,
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
  },
  {
    id: 1,
    name: "polo shirtd",
    price: 2314,
    ratings: 334,
    stars: 5,
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
  },
];

const emptyCart: Cart = [];
const productsURL = "http://localhost:3000/products";
const cartURL = "http://localhost:3000/cart";

beforeAll(()=>{
  HTMLElement.prototype.scrollIntoView = vi.fn()

  const spy = vi.spyOn(global, "fetch").mockImplementation(
    vi.fn((url: string) => {
      const values =
        url === productsURL ? products : cartURL === url ? emptyCart : null;
      if (!values) return;

      return Promise.resolve({
        json: ()=>Promise.resolve(values),
      });
    }) as Mock
  );
})

afterAll(()=>{
  vi.resetAllMocks()
})

describe("StorePage", () => {
  it("renders on the screen", async () => {
    const route: RouteObject[] = [{ path: "/", element: <StorePage /> }];
    const router = createMemoryRouter(route);
    render(<RouterProvider router={router} />);

    const storePage = await waitFor(() => screen.getByTestId("store_page"));

    expect(storePage).toBeInTheDocument();
    expect(storePage).toMatchSnapshot();
  });

  it("render store page when men's clothing link is clicked", async () => {
    const router = createMemoryRouter(routes);
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const link = await waitFor(() =>
      screen.getByRole("link", { name: "Men's Clothing" })
    );

    expect(link).toBeInTheDocument();

    await user.click(link);

    const storePage = await waitFor(() => screen.getByTestId("store_page"));

    expect(storePage).toBeInTheDocument();
  });

  it("render store page when men's clothing link is clicked", async () => {
    const router = createMemoryRouter(routes);
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const link = await waitFor(() =>
      screen.getByRole("link", { name: "Men's Clothing" })
    );

    expect(link).toBeInTheDocument();

    await user.click(link);

    const storePage = await waitFor(() => screen.getByTestId("store_page"));

    expect(storePage).toBeInTheDocument();
  });
});

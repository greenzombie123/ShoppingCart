import { afterAll, beforeAll, describe, expect, it, Mock, vi } from "vitest";
import { Cart, Product } from "../products";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import StorePage, { StarContainer } from "../components/StorePage";
import { render, screen, waitFor, within } from "@testing-library/react";
import routes from "../routes";
import userEvent from "@testing-library/user-event";
import storePageStyle from "../components/StorePage.module.css";

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
    id: 2,
    name: "polo shirta",
    price: 2314,
    ratings: 334,
    stars: 5,
    likes: 380,
    category: "Jewelry",
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
    id: 3,
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
    id: 4,
    name: "polo shirtc",
    price: 2314,
    ratings: 334,
    stars: 5,
    likes: 380,
    category: "Electronics",
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
    id: 5,
    name: "polo shirtd",
    price: 2314,
    ratings: 334,
    stars: 5,
    likes: 380,
    category: "Women's Clothing",
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
const menClothingProducts = [products[0], products[2]];
const emptyCart: Cart = [];
const productsURL = "http://localhost:3000/products";
const cartURL = "http://localhost:3000/cart";
const menClothingURL = "http://localhost:3000/products?category=Men's Clothing";

beforeAll(() => {
  HTMLElement.prototype.scrollIntoView = vi.fn();

  vi.spyOn(global, "fetch").mockImplementation(
    vi.fn((url: string) => {
      const values =
        url === productsURL
          ? products
          : cartURL === url
          ? emptyCart
          : url === menClothingURL
          ? menClothingProducts
          : null;
      if (!values) throw new Error("Couldn't process url string");
      return Promise.resolve({
        json: () => Promise.resolve(values),
      });
    }) as Mock
  );
});

afterAll(() => {
  vi.resetAllMocks();
});

describe("StorePage", () => {
  it("renders on the screen", async () => {
    const route: RouteObject[] = [
      { path: "/", element: <StorePage />, loader: () => products },
    ];
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

  it("render store items when men's clothing link is clicked", async () => {
    const router = createMemoryRouter(routes);
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    const link = await waitFor(() =>
      screen.getByRole("link", { name: "Men's Clothing" })
    );

    await user.click(link);

    const storePage = await waitFor(() => screen.getByTestId("store_page"));

    // Use within to find DOM elements within DOM elements
    const storeItems = await waitFor(() =>
      within(storePage).getAllByAltText(/^polo shirt/i)
    );

    expect(storeItems[0]).toBeInTheDocument();
    expect(storeItems[1]).toBeInTheDocument();
  });

  it(" renders all 5 stars in star container", async () => {
    render(<StarContainer stars={0} />);

    const stars = await waitFor(() =>
      screen.getAllByRole("img", { name: "star" })
    );
    // console.log(await screen.getByRole("img", {name:"star"}).classList)
    expect(stars.length).toBe(5);
  });

  it(" renders 4 stars that are on", async () => {
    render(<StarContainer stars={4} />);

    const stars = await waitFor(() =>
      screen
        .getAllByRole("img", { name: "star" })
        .filter((star) => star.classList.contains(storePageStyle.on))
    );
    // console.log(await screen.getByRole("img", {name:"star"}).classList)
    expect(stars.length).toBe(4);
  });

  it(" renders star container", async () => {
    const route: RouteObject[] = [
      { path: "/", element: <StorePage />, loader: () => [products[0]] },
    ];
    const router = createMemoryRouter(route);
    render(<RouterProvider router={router} />);

    const stars = await waitFor(() =>
      screen.getAllByRole("img", { name: "star" })
    );
    
    expect(stars.length).toBe(5);
  });
});

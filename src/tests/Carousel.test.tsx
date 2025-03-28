import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import {
  createMemoryRouter,
  MemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Carousel, { Slider } from "../components/Carousel";
import routes from "../routes";
import { Product } from "../products";
import userEvent from "@testing-library/user-event";

beforeAll(()=>{
  HTMLElement.prototype.scrollIntoView = vi.fn()
})

afterAll(()=>{
  // vi.resetAllMocks()
})

describe("Carousel", () => {
  it.skip("renders buttons on the screen", async () => {

    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    const buttons = await waitFor(() => screen.getAllByRole("button"));

    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
  });

  it.skip("renders all 5 slides", () => {
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
        name: "polo shirt",
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
        name: "polo shirt",
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
        name: "polo shirt",
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
        name: "polo shirt",
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

    render(
      <MemoryRouter>
        <Slider products={products} currentSlide={1}/>
      </MemoryRouter>
    );

    const slides = screen.getAllByTestId("slide");

    expect(slides[0]).toBeInTheDocument();
    expect(slides[1]).toBeInTheDocument();
    expect(slides[2]).toBeInTheDocument();
    expect(slides[3]).toBeInTheDocument();
    expect(slides[4]).toBeInTheDocument();
    expect(slides[0]).toMatchSnapshot();
  });

  it("Moves the slider to the right when a button is pushed", async () => {

    const mock = vi.fn()
    HTMLElement.prototype.scrollIntoView = mock
    
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
        name: "polo shirt",
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
        name: "polo shirt",
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
        name: "polo shirt",
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
        name: "polo shirt",
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

    const routes:RouteObject[] = [{path:"/", element:<Carousel/>, loader: ()=> products}]

    const user = userEvent.setup()

    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    const buttons = await waitFor(()=>screen.getAllByRole<HTMLButtonElement>("button"));

    const slides = await waitFor(()=>screen.getAllByTestId("slide"))

    expect(slides[0]).toBeInTheDocument()
    expect(slides[1]).toBeInTheDocument()
    expect(slides[2]).toBeInTheDocument()
    expect(slides[3]).toBeInTheDocument()
    expect(slides[4]).toBeInTheDocument()
    expect(slides[5]).not.toBeNull()

    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledOnce()
    expect(mock.mock.instances).toContain(slides[0])

     await user.click(buttons[1])

     expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledTimes(2)
     expect(mock.mock.instances).toContain(slides[1])
  });
});

describe("SlideState", ()=>{
  it("")
})

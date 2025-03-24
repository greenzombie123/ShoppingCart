import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouteObject, RouterProvider } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Carousel, { Slider } from "../components/Carousel";
import App from "../App";
import routes from "../routes";

describe("Carousel", () => {
  it("renders buttons on the screen", async () => {
    const router = createMemoryRouter(routes);

    render(<RouterProvider router={router} />);

    const buttons = await waitFor(() => screen.getAllByRole("button"));

    expect(buttons[0]).toBeInTheDocument();
    expect(buttons[1]).toBeInTheDocument();
  });

  it("render a slide of a product", async ()=>{
    const container = render(<Slider/>)

    const slide = await waitFor(() => screen.getByTestId("slide"));

    expect(slide).toBeInTheDocument();
  })

  it("renders all 5 slides",async ()=>{

   render(<Slider/>)

    const slides = await waitFor(() => screen.getAllByRole("link"));

    expect(slides[0]).toBeInTheDocument();
    expect(slides[1]).toBeInTheDocument();
    expect(slides[2]).toBeInTheDocument();
    expect(slides[3]).toBeInTheDocument();
    expect(slides[4]).toBeInTheDocument();
  })
});

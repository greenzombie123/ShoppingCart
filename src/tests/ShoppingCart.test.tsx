import { describe, expect, it } from "vitest";
import ShoppingCart from "../components/ShoppingCart";
import { mockCart, renderWithRouter } from "../utilities/testulit";
import { screen } from "@testing-library/dom";

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
});

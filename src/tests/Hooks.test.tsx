import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import useViewedItems from "../custom_hooks/useViewedItems";
import { mockCart } from "../utilities/testulit";
import { Product } from "../products";
import { render, waitFor } from "@testing-library/react";

describe("useViewedItems", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("adds a product to the viewedItems database", async () => {
    const firstFetch = () =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, products: [] }),
      });

    const secondFetch: Mock = vi.fn();

    const mockProduct: Product = {
      name: "Jupopo AirFlex Running Shoes",
      id: "7",
      category: "Men's Clothing",
      price: 89.99,
      ratings: 198,
      stars: 4,
      likes: 431,
      styles: [
        {
          description: "",
          picture: "/images/ID3692_HM5.avif",
          isCurrentStyle: true,
        },
      ],
    };

    const spy = vi
      .spyOn(global, "fetch")
      .mockImplementationOnce(firstFetch as Mock)
      .mockImplementationOnce(secondFetch as Mock);

    const MockComponent = () => {
      const g = useViewedItems(mockProduct);

      return <></>;
    };

    render(<MockComponent />);

    await waitFor(() =>
      expect(spy).lastCalledWith("http://localhost:3000/viewedItems/1", {
        method: "PATCH",
        body: JSON.stringify({ products: [mockProduct] }),
      })
    );
  });

  it("removes last product and adds a new product to the viewedItems database", async () => {
    const mockProduct: Product = {
      name: "Jupopo AirFlex Running Shoes",
      id: "7",
      category: "Men's Clothing",
      price: 89.99,
      ratings: 198,
      stars: 4,
      likes: 431,
      styles: [
        {
          description: "",
          picture: "/images/ID3692_HM5.avif",
          isCurrentStyle: true,
        },
      ],
    };

    const newMockProduct: Product = {
      name: "Jupopo AirFlex Running Shoes",
      id: "8",
      category: "Men's Clothing",
      price: 89.99,
      ratings: 198,
      stars: 4,
      likes: 431,
      styles: [
        {
          description: "",
          picture: "/images/ID3692_HM5.avif",
          isCurrentStyle: true,
        },
      ],
    };

    const firstFetch = () =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 1,
            products: [
              mockProduct,
              mockProduct,
              mockProduct,
              mockProduct,
              mockProduct,
            ],
          }),
      });

    const secondFetch: Mock = vi.fn();

    const spy = vi
      .spyOn(global, "fetch")
      .mockImplementationOnce(firstFetch as Mock)
      .mockImplementationOnce(secondFetch as Mock);

    const MockComponent = () => {
      useViewedItems(newMockProduct);

      return <></>;
    };

    render(<MockComponent />);

    await waitFor(() =>
      expect(spy).lastCalledWith("http://localhost:3000/viewedItems/1", {
        method: "PATCH",
        body: JSON.stringify({
          products: [
            newMockProduct,
            mockProduct,
            mockProduct,
            mockProduct,
            mockProduct,
          ],
        }),
      })
    );
  });
});

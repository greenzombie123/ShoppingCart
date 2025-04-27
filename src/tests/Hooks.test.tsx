import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import useViewedItems from "../custom_hooks/useViewedItems";
import { mockCart } from "../utilities/testulit";
import { Product } from "../products";
import { render, waitFor } from "@testing-library/react";

describe("useViewedItems", () => {
  it("adds a product to the viewedItems database", async () => {
    const firstFetch = () =>
      Promise.resolve({
        json: () => Promise.resolve([]),
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
      expect(spy).lastCalledWith("http://localhost:3000/viewedItems", {
        method: "PUT",
        body: JSON.stringify([mockProduct]),
      })
    );

    // expect(spy.mock.calls[1][0]).toBe("http:/3000/viewedItems")
  });
});

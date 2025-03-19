import { afterEach, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { getCart, getProducts } from "../Loaders";
import { Cart, CartItem, Product } from "../products";

describe("getProducts", () => {
  let things : {name:string, id:string}[]

  beforeEach(async () => {
    const stuff = ["ice", "teddybear", "racing car"];

    const jsonArray = await Promise.all(
      stuff.map<Promise<Response>>(async (a): Promise<Response> => {
        return await fetch(`http://localhost:3000/test/`, {
          method: "POST",
          body: JSON.stringify({ name: a }),
          headers: { "Content-Type": "application/json" },
        });
      })
    )

    things = await Promise.all(
      jsonArray.map(async (item): Promise<{name:string, id:string}> => {
        return await item.json();
      })
    )
  });

  afterEach(async () => {

    vi.resetAllMocks()

    await Promise.all( things.map<Promise<Response>>(async (e, i):Promise<Response> =>{
        return await fetch(`http://localhost:3000/test/${things[i].id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
    })
)

  });

  it("Get Yuks Polo Shirt from the server", async () => {
    vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([{ name: "Yuks Polo Shirt" }]),
        })
      ) as Mock
    );

    const products: Product[] = await getProducts();

    const isThere = products.some(
      (product) => product.name === "Yuks Polo Shirt"
    );

    expect(fetch).toBeCalled();
    expect(isThere).toBe(true);
  });

  it("Get Solid Gold Petite Micropave from the server", async () => {
    vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([{ name: "Solid Gold Petite Micropave" }]),
        })
      ) as Mock
    );

    const products: Product[] = await getProducts();

    const isThere = products.some(
      (product) => product.name === "Solid Gold Petite Micropave"
    );

    expect(isThere).toBe(true);
  });

  it("Solid Gold Petite Micropave's ID is 19", async () => {
    vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([{ name: "Solid Gold Petite Micropave", id: 19 }]),
        })
      ) as Mock
    );

    const products: Product[] = await getProducts();

    const product: Product | undefined = products.find(
      (product) => product.id === 19
    );

    expect((product as Product).name).toBe("Solid Gold Petite Micropave");
  });
});

describe("getCart", () => {
  it("Return an empty cart", async () => {
    vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([]),
        })
      ) as Mock
    );

    const cart: Cart = await getCart();

    expect(cart.length).toBe(0);
  });

  it("Return one object", async () => {
    const product: Product = {
      name: "shirt",
      id: 1,
      category: "Men's Clothing",
      price: 199.99,
      ratings: 145,
      stars: 5,
      likes: 342,
      styles: [
        {
          description: "",
          picture:
            "/images/4ct-Emerald-Cut-Ruby-Ring-Lab-Created-Ruby-Engagement-Ring.webp",
          isCurrentStyle: true,
        },
      ],
    };

    const cartItem: CartItem = {
      product: { ...product },
      id: product.id,
      quantity: 2,
      style: "",
    };

    vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([cartItem]),
        })
      ) as Mock
    );

    const cart: Cart = await getCart();

    expect(cart[0]).toStrictEqual(cartItem);
  });

  it("", async () => {});
});

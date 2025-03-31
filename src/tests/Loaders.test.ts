import { describe, expect, expectTypeOf, it, Mock, vi } from "vitest";
import { getCart, getProducts, getProductsByCategory, getRandomProducts } from "../Loaders.js";
import { Cart, CartItem, Product } from "../products.js";

//Pre setup

const mockProducts: Product[] = [
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

describe("getProducts", () => {
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

    const spy = vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([cartItem]),
        })
      ) as Mock
    );

    const cart: Cart = await getCart();

    expect(cart[0]).toStrictEqual(cartItem);
    spy.mockRestore();
  });
});

describe("getRandomProducts", () => {
  it("Returns an array of 5 random products", async () => {
    const spy = vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              { id: 1 },
              { id: 2 },
              { id: 3 },
              { id: 4 },
              { id: 5 },
            ]),
        })
      ) as Mock
    );

    const products = await getRandomProducts();
    expect(products.length).toBe(5);
    spy.mockRestore();
  });

  it("Returns type Product objects and exactly 5 items", async () => {
    const mockProducts: Product[] = [
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
      {
        id: 6,
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
    ];

    const spy = vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockProducts),
        })
      ) as Mock
    );

    const products = await getRandomProducts();
    const product = products[0];

    expect(products.length).toBe(5);
    expectTypeOf(product).toEqualTypeOf<Product>();

    spy.mockRestore();
  });
});

describe("getProductsByCategory", () => {
  it("returns products under the category of men's clothing", async () => {

    const mensClothingUrl = `http://localhost:3000/products?category=Men's Clothing`

    vi.spyOn(global, "fetch").mockImplementation(
      vi.fn((url: string) => {
        const values =
          url === mensClothingUrl ? [mockProducts[0], mockProducts[2]] : null;
        if(!values) throw new Error("Something programmatically incorrect has occured");
        
        return Promise.resolve({
          json: () => Promise.resolve(values),
        });
      }) as Mock
    );

    const products:Product[] = await getProductsByCategory("Men's Clothing")

    expect(products[0]).toEqual(mockProducts[0])
    expect(products[1]).toEqual(mockProducts[2])
  });
});

// describe.skip("Test Server", () => {
//   //   let things: { name: string; id: string }[];

//   const testItems = [
//     { id: 1, name: "teddybear" },
//     { id: 2, name: "surfboard" },
//   ];

//   beforeEach(async () => {
//     const response = await fetch("http://localhost:3000/test/", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(testItems),
//     }).catch((e) => console.log(e));

//     if (response.ok) {
//       console.log("NICE");
//     }
//   });

//   //   beforeEach(async () => {
//   //     const stuff = ["ice", "teddybear", "racing car"];

//   //     const jsonArray = await Promise.all(
//   //       stuff.map<Promise<Response>>(async (a): Promise<Response> => {
//   //         return await fetch(`http://localhost:3000/test/`, {
//   //           method: "POST",
//   //           body: JSON.stringify({ name: a }),
//   //           headers: { "Content-Type": "application/json" },
//   //         });
//   //       })
//   //     );

//   //     things = await Promise.all(
//   //       jsonArray.map(async (item): Promise<{ name: string; id: string }> => {
//   //         return await item.json();
//   //       })
//   //     );
//   //   });

//   //   afterEach(async () => {
//   //     vi.resetAllMocks();

//   //     await Promise.all(
//   //       things.map<Promise<Response>>(async (e, i): Promise<Response> => {
//   //         return await fetch(`http://localhost:3000/test/${things[i].id}`, {
//   //           method: "DELETE",
//   //           headers: { "Content-Type": "application/json" },
//   //         });
//   //       })
//   //     );
//   //   });

//   it("Returns nothing when sent a request", async () => {
//     const data = await fetch("http://localhost:3000/test/1");
//     console.log(data);
//     const item = await data.json();

//     expect(item).toStrictEqual([]);
//   });
// });

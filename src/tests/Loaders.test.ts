import {  describe, expect, expectTypeOf, it, Mock, vi } from "vitest";
import {
  addToCart,
  getCart,
  getProducts,
  getProductsByCategory,
  getRandomProducts,
  getStoreItems,
  getViewedItems,
  updateCart,
} from "../Loaders.js";
import { Cart, CartItem, Product } from "../products.js";
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { mockOneCartItem } from "../utilities/testulit.js";

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

// afterEach(()=>{
//   vi.clearAllMocks()
// })

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
      id: "abc",
      quantity: 2,
      style: "",
      name: product.name,
      price: product.price,
      picture: product.styles[0].picture,
      product: {} as Product,
    };

    const spy = vi.spyOn(global, "fetch").mockImplementation(
      vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([cartItem]),
        })
      ) as Mock
    );

    const cart: Cart = await getCart();

    expect(cart[0]).toEqual(cartItem);
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
    const mensClothingUrl = `http://localhost:3000/products?category=Men's Clothing`;

    vi.spyOn(global, "fetch").mockImplementation(
      vi.fn((url: string) => {
        const values =
          url === mensClothingUrl ? [mockProducts[0], mockProducts[2]] : null;
        if (!values)
          throw new Error("Something programmatically incorrect has occured");

        return Promise.resolve({
          json: () => Promise.resolve(values),
        });
      }) as Mock
    );

    const products: Product[] = await getProductsByCategory("Men's Clothing");

    expect(products[0]).toEqual(mockProducts[0]);
    expect(products[1]).toEqual(mockProducts[2]);
  });
});

describe("getStoreItems", () => {
  it("returns products under the category of men's clothing", async () => {
    const mensClothingUrl = `http://localhost:3000/products?category=Men's Clothing`;

    vi.spyOn(global, "fetch").mockImplementation(
      vi.fn((url: string) => {
        const values =
          url === mensClothingUrl ? [mockProducts[0], mockProducts[2]] : null;
        if (!values)
          throw new Error("Something programmatically incorrect has occured");

        return Promise.resolve({
          json: () => Promise.resolve(values),
        });
      }) as Mock
    );

    const mockParam: LoaderFunctionArgs = {
      params: { category: "Men's Clothing" },
      context: undefined,
      request: undefined as unknown as Request,
    };

    const products: Product[] = (await getStoreItems(mockParam)) as Product[];

    expect(products[0]).toEqual(mockProducts[0]);
    expect(products[1]).toEqual(mockProducts[2]);
  });
});

describe("addToCart", () => {
  it("adds customer's request to the cart", async () => {
    vi.mock("uuid", () => ({ v4: () => "abc" }));

    const mock = ()=>({ok:true});

    const spy = vi.spyOn(global, "fetch").mockImplementation(mock as Mock);

    const formData: FormData = new FormData();

    //formData.append("cartItemId", "abc");
    formData.append("name", "stuff");
    formData.append("price", "222");
    //formData.append("id", "1");
    formData.append("quantity", "2");
    formData.append("style", "red");
    formData.append(
      "picture",
      "http://localhost:3000/images/poloshirtblack.webp"
    );
    const mockProduct: Product = {
      name: "stuff",
      price: 222,
      id: 1,
      ratings: 1,
      stars: 1,
      styles: [],
      likes: 1,
      category: "Men's Clothing",
    };
    const productString = JSON.stringify(mockProduct);
    formData.append("product", productString);

    const request: Request = new Request("http://localhost:3000/cart", {
      method: "POST",
      body: formData,
    });

    const mockParam: ActionFunctionArgs = {
      params: { product: "1" },
      request: request,
      context: null,
    };

    await addToCart(mockParam);

    expect(spy).toBeCalled();

    expect(spy).toBeCalledWith("http://localhost:3000/cart", {
      body: `{"name":"stuff","price":222,"id":"abc","quantity":2,"style":"red","picture":"http://localhost:3000/images/poloshirtblack.webp","product":${productString}}`,
      method: "POST",
    });
  });
});

describe("getViewedItems", () => {
  it("return viewedItems", async () => {
    const request = new Request("http://localhost:3000/viewedItems/1");
    const loaderFunctionArgs: LoaderFunctionArgs = {
      request: request,
      params: { i: undefined },
      context: undefined,
    };

    const viewItems = { id: "1", products: mockProducts };

    const mockFetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(viewItems) })
    );

    vi.spyOn(global, "fetch").mockImplementation(mockFetch as Mock);

    const items = await getViewedItems(loaderFunctionArgs);

    expect(items).toEqual(mockProducts);
  });
});

describe("updateCart", () => {
  it("removes deleted cart items and changes quantity of cartitems", async () => {
    const mockCartItem1: CartItem = mockOneCartItem;
    const mockCartItem2: CartItem = {
      ...mockCartItem1,
      quantity: 2,
      id: "ttt",
    };

    const mockDelete = vi.fn().mockResolvedValue({ ok: true });
    const mockPost = vi.fn().mockResolvedValue({ ok: true });

    const spy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementationOnce(mockDelete)
      .mockImplementationOnce(mockDelete)
      .mockImplementationOnce(mockPost)
      .mockImplementationOnce(mockPost);

    const formData: FormData = new FormData();
    formData.set(mockCartItem1.id, JSON.stringify(mockCartItem1));
    formData.set(mockCartItem2.id, JSON.stringify(mockCartItem2));

    const request: Request = new Request(`http://localhost:3000/cart/`, {
      method: "POST",
      body: formData,
    });

    const mockActionFuncArgs: ActionFunctionArgs = {
      params: {},
      request: request,
      context: null,
    };

    await updateCart(mockActionFuncArgs);

    expect(spy).toBeCalledTimes(4);
    expect(spy.mock.calls[0]).toEqual([
      `http://localhost:3000/cart/123`,
      { method: "DELETE" },
    ]);
    expect(spy.mock.calls[1]).toEqual([
      `http://localhost:3000/cart/ttt`,
      { method: "DELETE" },
    ]);
    expect(spy.mock.calls[2]).toEqual([
      `http://localhost:3000/cart`,
      { method: "POST", body: JSON.stringify(mockCartItem1) },
    ]);
    expect(spy.mock.calls[3]).toEqual([
      `http://localhost:3000/cart`,
      { method: "POST", body: JSON.stringify(mockCartItem2) },
    ]);
  });

  it("removes only one cart item from your cart", async () => {
    const mockCartItem1: CartItem = mockOneCartItem;
    const mockCartItem2: CartItem = {
      ...mockCartItem1,
      quantity: 2,
      id: "ttt",
    };

    const mockDelete = vi.fn().mockResolvedValue({ ok: true });
    const mockPost = vi.fn().mockResolvedValue({ ok: true });

    const spy = vi
      .spyOn(globalThis, "fetch")
      .mockImplementationOnce(mockDelete)
      .mockImplementationOnce(mockDelete)
      .mockImplementationOnce(mockPost)
      .mockImplementationOnce(mockPost);

    const formData: FormData = new FormData();
    formData.set(mockCartItem1.id, JSON.stringify(mockCartItem1));
    formData.set(mockCartItem2.id, JSON.stringify(mockCartItem2));
    formData.set("remove", mockCartItem2.id);


    const request: Request = new Request(`http://localhost:3000/cart/`, {
      method: "POST",
      body: formData,
    });

    const mockActionFuncArgs: ActionFunctionArgs = {
      params: {},
      request: request,
      context: null,
    };

    await updateCart(mockActionFuncArgs);

    expect(spy).toBeCalledTimes(3);
    expect(spy.mock.calls[0]).toEqual([
      `http://localhost:3000/cart/123`,
      { method: "DELETE" },
    ]);
    expect(spy.mock.calls[1]).toEqual([
      `http://localhost:3000/cart/ttt`,
      { method: "DELETE" },
    ]);
    expect(spy.mock.calls[2]).toEqual([
      `http://localhost:3000/cart`,
      { method: "POST", body: JSON.stringify(mockCartItem1) },
    ]);
    expect(spy.mock.calls[3]).toEqual(undefined);
  });
});

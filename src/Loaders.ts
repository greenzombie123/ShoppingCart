import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";
import { Cart, CartItem, Product, ProductCategory } from "./products";
import { createCartItemId } from "./utilities/utility";

const moveToCheckout: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  redirect("/checkout");
};

const updateCart: ActionFunction = async ({ request }: ActionFunctionArgs) => {

  const formData = await request.formData();
  const removalId = formData.get("remove");
  const deleteRequests = [];

  for (const key of formData.keys()) {
    if ("remove" === key) continue;
    const promise = fetch(`http://localhost:3000/cart/${key}`, {
      method: "DELETE",
    });
    deleteRequests.push(promise);
  }

  try {
    await Promise.all(deleteRequests);
  } catch (error) {
    console.log(error);
  }

  const postRequests = [];

  for (const pair of formData.entries()) {
    if (removalId === pair[0] || pair[0] === "remove") continue;
    const promise = fetch(`http://localhost:3000/cart`, {
      method: "POST",
      body: pair[1],
    });
    postRequests.push(promise);
  }

  try {
    await Promise.all(postRequests);
  } catch (error) {
    console.log(error);
  }

  const moveToCheckout = formData.get("checkout");
  if (moveToCheckout) {
    return redirect("/checkout");
  }
};

type ViewedItemsData = {
  id: string;
  products: Product[];
};

const getViewedItems: LoaderFunction = async (): Promise<Product[]> => {
  const viewItems: ViewedItemsData = await (
    await fetch("http://localhost:3000/viewedItems/1")
  ).json();
  return viewItems.products;
};

const removeCartItem: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const cartItemId = formData.get("id");

    const response = await fetch(`http://localhost:3000/cart/${cartItemId}`, {
      method: "DELETE",
    });
    if (response.ok) return { ok: true };
  } catch (error) {
    console.log("Something happend");
    console.log(error);
  }
};

const addToCart: ActionFunction = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));
    const style = formData.get("style");
    const picture = formData.get("picture");
    const product: Product = JSON.parse(formData.get("product") as string);

    if (name && price && product && quantity && picture) {
      const cartItem: CartItem = {
        name: name as string,
        price: price,
        id: createCartItemId(),
        quantity: quantity,
        style: style ? (style as string) : undefined,
        picture: picture as string,
        product: product,
      };

      const data = JSON.stringify({ ...cartItem });

      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        body: data,
      });

      if (response.ok) return { productInfo: cartItem };
    }
  } catch (error) {
    console.log(error);
  }
};

const getProductsByCategory = async (
  category: ProductCategory
): Promise<Product[]> => {
  const data = await fetch(
    `http://localhost:3000/products?category=${category}`
  );
  return await data.json();
};

const getStoreItems: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs<{ category: string }>) => {
  const category =
    params.category === "Men's Clothing"
      ? "Men's Clothing"
      : params.category === "Women's Clothing"
      ? "Women's Clothing"
      : params.category === "Electronics"
      ? "Electronics"
      : params.category === "Jewelry"
      ? "Jewelry"
      : null;
  if (!category) throw new Error("No such category exist");

  return await getProductsByCategory(category);
};

const getProducts = async (): Promise<Product[]> => {
  const data = await fetch("http://localhost:3000/products");
  return await data.json();
};

const getCart = async (): Promise<Cart> => {
  const data = await fetch("http://localhost:3000/cart");
  return await data.json();
};

const getRandomProducts = async (): Promise<Product[]> => {
  const data = await fetch("http://localhost:3000/products");
  const products: Product[] = await data.json();

  const indices: number[] = [];
  const newProducts: Product[] = [];
  let ranNum: number;

  for (let index = 0; index < 5; index++) {
    do {
      ranNum = Math.floor(Math.random() * products.length);
    } while (indices.some((i) => i === ranNum));

    indices.push(ranNum);
    newProducts.push(products[ranNum]);
  }

  return newProducts;
};

export {
  getProducts,
  getCart,
  getRandomProducts,
  getProductsByCategory,
  getStoreItems,
  addToCart,
  removeCartItem,
  getViewedItems,
  updateCart,
  moveToCheckout,
};

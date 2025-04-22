import {
  ActionFunction,
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
} from "react-router-dom";
import { Cart, CartItem, Product, ProductCategory } from "./products";

const addViewedItem = ()=>{}

const removeCartItem: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const cartItemId = formData.get("id");
    console.log(formData.get("id"));

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
    const id = Number(formData.get("id"));
    const quantity = Number(formData.get("quantity"));
    const style = formData.get("style");
    const picture = formData.get("picture");

    if (name && price && id && quantity && picture) {
      const cartItem: CartItem = {
        name: name as string,
        price: price,
        id: id,
        quantity: quantity,
        style: style ? (style as string) : undefined,
        picture: picture as string,
      };

      const data = JSON.stringify({...cartItem, id:id.toString()});

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
  addViewedItem
};

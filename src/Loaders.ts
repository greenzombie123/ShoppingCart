import { LoaderFunction, LoaderFunctionArgs } from "react-router-dom";
import { Cart, Product, ProductCategory } from "./products";

const getProductsByCategory = async (category: ProductCategory):Promise<Product[]> => {
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
  //:Promise<Product[]>

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
};

import { useEffect } from "react";
import { Product } from "../products";

const useViewedItems = (product: Product) => {
  useEffect(() => {
    changeViewedItems(product);
  }, []);
};

const getViewedItems: () => Promise<Product[]> = async () => {
  const viewedItems: {
    id: string;
    products: Product[];
  } = await (await fetch("http://localhost:3000/viewedItems/1")).json();
  return viewedItems.products
};

const replaceViewedItems = (products: Product[], newProduct: Product) => {
  const viewedItems = [newProduct];

  for (let index = 0; index < 4; index++) {
    viewedItems.push(products[index]);
  }

  return viewedItems;
};

const hasSameProduct = (products: Product[], newProduct: Product) => {
  return products.some((product) => product.id === newProduct.id);
}

const addViewedItem = (products: Product[], newProduct: Product) => {
  const newViewedItems = [...products];
  newViewedItems.push(newProduct);
  return newViewedItems;
};

const updateViewedItems = async (products: Product[]) => {
  await fetch("http://localhost:3000/viewedItems/1", {
    method: "PATCH",
    body: JSON.stringify({ products: products }),
  });
};

const changeViewedItems = async (product: Product) => {
  let newViewedItems: Product[];
  const viewedItems = await getViewedItems();
  if (hasSameProduct(viewedItems, product)) return;
  if (viewedItems.length === 5)
    newViewedItems = replaceViewedItems(viewedItems, product);
  else newViewedItems = addViewedItem(viewedItems, product);
  await updateViewedItems(newViewedItems);
};

export default useViewedItems;

/**
 * get the array
 * see if there is a copy, dont add if there is
 * if not, see if there are 5 items in the array
 *  if so, takes out the last one and add the new one in front
 *  if there are less than 5, add it to the front
 */

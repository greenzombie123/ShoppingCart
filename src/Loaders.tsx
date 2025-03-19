import { Cart, Product } from "./products";

const getProducts = async ():Promise<Product[]> => {
    const data = await fetch("http://localhost:3000/products")
    return await data.json()
};

const getCart = async ():Promise<Cart> => {
    const data = await fetch("http://localhost:3000/cart")
    return await data.json()
};

export { getProducts, getCart };

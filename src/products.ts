// import fs from "fs";

export type ProductCategory =
  | "Jewelry"
  | "Men's Clothing"
  | "Women's Clothing"
  | "Electronics";

export type Product = {
  id: number | string;
  name: string;
  price: number;
  ratings: number;
  stars: 1 | 2 | 3 | 4 | 5;
  likes: number;
  styles: Style[];
  category: ProductCategory;
};

export type Style = {
  description: string;
  picture: string;
  isCurrentStyle: boolean;
};

export type CartItem = {
  cartItemId:string;
  name: string;
  price: number;
  id: number;
  quantity: number;
  style: string | undefined;
  picture: string;
  product:Product
};

export type Cart = CartItem[];

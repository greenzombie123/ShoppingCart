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
  name:string,
  price: number;
  id: number;
  quantity: number;
  style: string | undefined,
  picture:string
};

export type Cart = CartItem[];

// const thing: Product[] = [
//   {
//     id: 1,
//     name: "polo shirt",
//     price: 2314,
//     ratings: 334,
//     stars: 5,
//     likes: 380,
//     category: "Men's Clothing",
//     styles: [
//       {
//         description: "black",
//         picture: "/images/poloshirtblack.webp",
//         isCurrentStyle: true,
//       },
//       {
//         description: "blue",
//         picture: "/images/bluepoloshirt.jpg",
//         isCurrentStyle: false,
//       },
//     ],
//   },
//   {
//     id: 1,
//     name: "shirt",
//     price: 1299,
//     ratings: 234,
//     stars: 4,
//     likes: 1000,
//     category: "Men's Clothing",
//     styles: [
//       {
//         description: "white",
//         picture: "src/assets/bluepoloshirt.jpg",
//         isCurrentStyle: true,
//       },
//     ],
//   },
// ];

// const doShit = async () => {
//   const g = await fetch(`http://localhost:3000/test`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body:JSON.stringify({test:[]})
//   }).catch(e=>console.log(e))



//   console.log(g)

// };

// doShit()

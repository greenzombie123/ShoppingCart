import fs from "fs";
import path from "path";

export type ProductCategory =
  | "Jewelry"
  | "Men's Clothing"
  | "Women's Clothing"
  | "Electronics";

export type Product = {
  id: number;
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
  product: Product;
  id: number;
  quantity: number;
  style: string;
};

export type Cart = CartItem[];

const thing: Product[] = [{
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
    }
  ],
},
{
  id: 1,
  name: "shirt",
  price: 1299,
  ratings: 234,
  stars: 4,
  likes: 1000,
  category: "Men's Clothing",
  styles: [
    {
      description: "white",
      picture: "src/assets/bluepoloshirt.jpg",
      isCurrentStyle: true,
    },
  ],
}
];

const doShit = async ()=>{
  const g = await fetch("https://fakestoreapi.com/products")
  const stuff = await g.json()

  fs.writeFile("./src/b.json", JSON.stringify(stuff), err=>{})
}

// doShit()


// fs.readFile("./src/b.json",'utf8', (err,files)=>{
//   console.log(err, files)
// })

console.log(data[0])

let counter = 14

// const newList:Product[] = data.map(k=>{
//   return {
//     id: counter++,
//     name:k.title,
//     price:k.price,
//     stars:Math.round(k.rating.rate),
//     ratings:k.rating.count,
//     category:k.category === "women's clothing" ? "Women's Clothing" : k.category === "men's clothing" ? "Men's Clothing" : k.category === "electronics" ? "Electronics" : "Jewelry",
//     styles:[{
//       description:"",
//       picture:k.image,
//       isCurrentStyle:true
//     }]

//   }
// })

// const products = JSON.parse(data)

fs.readFile("./src/a.json",'utf8', (err,data)=>{
  console.log(err, data)

  fs.appendFile("./src/c.json", data, err=>{})

})

// fs.writeFile("./src/c.json", JSON.stringify(products), err=>{})


// console.log("WOW")
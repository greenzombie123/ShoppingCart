import { Cart, Product } from "./products";

const getProducts = async ():Promise<Product[]> => {
    const data = await fetch("http://localhost:3000/products")
    return await data.json()
};

const getCart = async ():Promise<Cart> => {
    const data = await fetch("http://localhost:3000/cart")
    return await data.json()
}; 

const getRandomProducts = async ():Promise<Product[]> =>{ //:Promise<Product[]>
//     return await [
//         {
//         id: 1,
//         name: "polo shirt",
//         price: 2314,
//         ratings: 334,
//         stars: 5,
//         likes: 380,
//         category: "Men's Clothing",
//         styles: [
//           {
//             description: "black",
//             picture: "/images/poloshirtblack.webp",
//             isCurrentStyle: true,
//           },
//           {
//             description: "blue",
//             picture: "/images/bluepoloshirt.jpg",
//             isCurrentStyle: false,
//           },
//         ],
//       },{
//         id: 1,
//         name: "polo shirt",
//         price: 2314,
//         ratings: 334,
//         stars: 5,
//         likes: 380,
//         category: "Men's Clothing",
//         styles: [
//           {
//             description: "black",
//             picture: "/images/poloshirtblack.webp",
//             isCurrentStyle: true,
//           },
//           {
//             description: "blue",
//             picture: "/images/bluepoloshirt.jpg",
//             isCurrentStyle: false,
//           },
//         ],
//       },{
//         id: 1,
//         name: "polo shirt",
//         price: 2314,
//         ratings: 334,
//         stars: 5,
//         likes: 380,
//         category: "Men's Clothing",
//         styles: [
//           {
//             description: "black",
//             picture: "/images/poloshirtblack.webp",
//             isCurrentStyle: true,
//           },
//           {
//             description: "blue",
//             picture: "/images/bluepoloshirt.jpg",
//             isCurrentStyle: false,
//           },
//         ],
//       },{
//         id: 1,
//         name: "polo shirt",
//         price: 2314,
//         ratings: 334,
//         stars: 5,
//         likes: 380,
//         category: "Men's Clothing",
//         styles: [
//           {
//             description: "black",
//             picture: "/images/poloshirtblack.webp",
//             isCurrentStyle: true,
//           },
//           {
//             description: "blue",
//             picture: "/images/bluepoloshirt.jpg",
//             isCurrentStyle: false,
//           },
//         ],
//       },{
//         id: 1,
//         name: "polo shirt",
//         price: 2314,
//         ratings: 334,
//         stars: 5,
//         likes: 380,
//         category: "Men's Clothing",
//         styles: [
//           {
//             description: "black",
//             picture: "/images/poloshirtblack.webp",
//             isCurrentStyle: true,
//           },
//           {
//             description: "blue",
//             picture: "/images/bluepoloshirt.jpg",
//             isCurrentStyle: false,
//           },
//         ],
//       }]

   const data = await fetch("http://localhost:3000/products")
   const products:Product[] = await data.json()

   const indices:number[] = []
   const newProducts:Product[] = []
   let ranNum:number

   for (let index = 0; index < 5; index++) {
        
        do {
            ranNum = Math.floor(Math.random() * products.length)
        } while (indices.some(i=> i === ranNum));

        indices.push(ranNum)
        newProducts.push(products[ranNum])
   } 
   
   return newProducts
}

export { getProducts, getCart, getRandomProducts };

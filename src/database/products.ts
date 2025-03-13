export type ProductCategory = "Jewelry" | "Men's Clothing" | "Women's Clothing" | "Electronics"

export type Product = {
	id:number,
	name:string,
	price:number,
	rating:number,
	stars:1|2|3|4|5,
	likes:number,
	styles:Style[]
	category:ProductCategory
}

export type Style = {
	description:string,
	picture:URL,
	isCurrentStyle:boolean, 
}

export type CartItem = {
	product:Product,
	id:number,
	quantity:number,
	style:string
}

export type Cart = CartItem[]
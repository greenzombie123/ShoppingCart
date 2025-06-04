import { useState } from "react";
import { Cart } from "../products";

const useCartItems = (cart: Cart ) => {

  const [cartItems, setCartItems] = useState<Cart>(cart);

  const handleUpdateCart = (cart:Cart)=>{
    setCartItems(cart)
  }

  const handleQuantityIncrease = (id: string) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.cartItemId === id)
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      else return cartItem;
    });

    setCartItems(updatedCart);
  };

  const handleQuantityDecrease = (id: string) => {
    const currentCartItem = cartItems.find((cartItem) => cartItem.id === id);
    if (currentCartItem?.quantity === 1) return;

    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.cartItemId === id)
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };
      else return cartItem;
    });

    setCartItems(updatedCart);
  };

  return {cartItems, handleQuantityDecrease, handleQuantityIncrease, handleUpdateCart}
};

export default useCartItems

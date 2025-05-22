import { useState } from "react";
import { Cart, CartItem } from "../products";

type CartItemQuantity = {
  id: number;
  quantity: number;
};

const useCartItems = (cart: Cart ) => {
  const newCart: CartItemQuantity[] = cart.map((cartItem) => ({
    id: cartItem.id,
    quantity: cartItem.quantity,
  }));

  const [cartItems, setCartItems] = useState<CartItemQuantity[]>(newCart);

  const handleQuantityIncrease = (id: number) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === id)
        return {
          ...cartItem,
          quantity: cartItem.quantity + 1,
        };
      else return cartItem;
    });

    setCartItems(updatedCart);
  };

  const handleQuantityDecrease = (id: number) => {
    const currentCartItem = cartItems.find((cartItem) => cartItem.id === id);
    if (currentCartItem?.quantity === 1) return;

    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === id)
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
        };
      else return cartItem;
    });

    setCartItems(updatedCart);
  };

  return {cartItems, handleQuantityDecrease, handleQuantityIncrease}
};

export default useCartItems

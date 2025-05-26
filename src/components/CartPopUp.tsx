import React, { useEffect, useRef } from "react";
import { Cart, CartItem } from "../products";
import style from "./CartPopUp.module.css";
import { useFetcher } from "react-router-dom";

interface CartPopUpProps {
  popUpData: CartItem | null;
  setPopUp?: React.Dispatch<React.SetStateAction<CartItem | null>>;
  cartItems:Cart
}

const CartPopUp = ({ popUpData, cartItems }: CartPopUpProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const fetcher = useFetcher();

  //const stringifiedCart = changeToJSONString(cartItems)  

  const handleCancelButtonClick = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  useEffect(() => {
    if (dialogRef.current && popUpData) {
      dialogRef.current.showModal();
    }
  }, [dialogRef, popUpData]);


  return (
    <dialog ref={dialogRef} onClick={handleCancelButtonClick}>
      <fetcher.Form method="DELETE" action="/mycart" >
        <input type="hidden" name="id" value={popUpData ? popUpData.id : ""} />
        {/* <input type="hidden" name="" /> */}
        <p>Remove the following item from your cart?</p>
        <p>{popUpData? popUpData.name : ""}</p>
        <button aria-label="removeCartItem" type="submit">Yes</button>
        <button
          type="button"
          aria-label="cancel"
          onClick={handleCancelButtonClick}
        >
          Cancel
        </button>
      </fetcher.Form>
    </dialog>
  );
};

const changeToJSONString = (cart:Cart)=>{
  const updatedCart = cart.map(cartItem => ({...cartItem, id:cartItem.id + ""}))
  return JSON.stringify(updatedCart)
}


export default CartPopUp;

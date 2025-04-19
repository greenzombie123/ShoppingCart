import React, { useEffect, useRef } from "react";
import { CartItem } from "../products";
import style from "./CartPopUp.module.css";

interface CartPopUpProps {
  popUpData: CartItem | null;
  setPopUp:React.Dispatch<React.SetStateAction<CartItem|null>>
}

const CartPopUp = ({ popUpData, setPopUp }: CartPopUpProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current && popUpData) {
      dialogRef.current.showModal();
    }
  }, [dialogRef, popUpData]);

  if (!popUpData) return;

  return (
    <dialog ref={dialogRef}>
      <p>Remove the following item from your cart?</p>
      <p>{popUpData.name}</p>
      <button aria-label="removeCartItem"></button>
    </dialog>
  );
};

export default CartPopUp


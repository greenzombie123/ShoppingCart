import React, { useEffect, useRef } from "react";
import { CartItem } from "../products";
import style from "./CartPopUp.module.css";

interface CartPopUpProps {
  popUpData: CartItem | null;
  setPopUp: React.Dispatch<React.SetStateAction<CartItem | null>>;
}

const CartPopUp = ({ popUpData, setPopUp }: CartPopUpProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleCancelButtonClick = () => {
    if (dialogRef.current) {
      setPopUp(null);
      dialogRef.current.close();
    }
  };

  useEffect(() => {
    if (dialogRef.current && popUpData) {
      dialogRef.current.showModal();
    }
  }, [dialogRef, popUpData]);

  if (!popUpData) return;

  return (
    <dialog ref={dialogRef} onClick={handleCancelButtonClick}>
      <p>Remove the following item from your cart?</p>
      <p>{popUpData.name}</p>
      <button aria-label="removeCartItem">Yes</button>
      <button
        type="button"
        aria-label="cancel"
        onClick={handleCancelButtonClick}
      >
        Cancel
      </button>
    </dialog>
  );
};

export default CartPopUp;

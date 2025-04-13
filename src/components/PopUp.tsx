import { useEffect, useRef } from "react";
import { CartItem } from "../products";
import style from "./PopUp.module.css"

export const PopUp = ({
    cartItem,
    status,
    data,
  }: {
    cartItem: CartItem | null;
    data: {ok:boolean};
    status:"idle" | "submitting" | "loading"
  }) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
  
    useEffect(() => {
      
      if (data?.ok && status === "idle") {
        dialogRef.current?.showModal();
      }
    }, [data, status]);
    return (
      <dialog ref={dialogRef} role="dialog">
        <img src={cartItem?.picture} alt={cartItem?.picture} />
        <h2>{cartItem?.name}</h2>
        <span>{cartItem?.price}</span>
        <span>{cartItem?.style}</span>
        <span>Quantity: {cartItem?.quantity}</span>
        <button type="button" onClick={()=>{dialogRef.current?.close()}} data-testId="g">1</button>
      </dialog>
    );
  };
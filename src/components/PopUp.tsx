import { useEffect, useRef } from "react";
import { CartItem } from "../products";
//import style from "./PopUp.module.css"

export const PopUp = ({
    status,
    data,
  }: {
    data: {productInfo:CartItem};
    status:"idle" | "submitting" | "loading"
  }) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const cartItem:CartItem | null = data ? data.productInfo : null
  
    useEffect(() => {
      
      if (data?.productInfo && status === "idle") {
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
        <button type="button" onClick={()=>{dialogRef.current?.close()}} data-testId="g">Ok</button>
      </dialog>
    );
  };
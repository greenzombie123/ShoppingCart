import { useEffect, useRef } from "react";
import { CartItem } from "../products";

export const PopUp = ({
    cartItem,
    status,
    data
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
        <button type="button" onClick={()=>{dialogRef.current?.close()}} data-testId="g">1</button>
      </dialog>
    );
  };
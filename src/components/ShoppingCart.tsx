import {
  Form,
  Link,
  Outlet,
  useFetcher,
  useLoaderData,
} from "react-router-dom";
import { Cart, CartItem, Product } from "../products";
import style from "./ShoppingCart.module.css";
import { StarContainer } from "./StorePage";
import { useEffect, useState } from "react";
import CartPopUp from "./CartPopUp";
import useCartItems from "../custom_hooks/useCartItems";
import { PopUp } from "./PopUp";

type PriceContainerProps = {
  cart: Cart;
};

export const PriceContainer = ({ cart }: PriceContainerProps) => {
  const price = cart.reduce(
    (total: number, nextItem: CartItem) => total + nextItem.price,
    0
  );

  // Adds a 5% tax to each cart item
  const priceWithTax = cart.reduce(
    (total: number, nextItem: CartItem) => total + nextItem.price + Math.round((nextItem.price * .05)*100) / 100,
    0
  );

  return (
    <Form className={style.priceContainer}>
      <div className={style.topPrice}>
        <p>Subtotal</p>
        <p>{price}</p>
      </div>
      <div className={style.bottomPrice}>
        <p>Total Incl. Tax</p>
        <p>{priceWithTax}</p>
      </div>
      <button className={style.checkoutButton}>Checkout</button>
    </Form>
  );
};

export const ViewedItemsContainer = () => {
  const viewedItems = useLoaderData<Product[]>();

  return (
    <>
      <div className={style.viewedList}>
        <p className={style.heading}>Viewed Items</p>
        {viewedItems.map((product) => (
          <ViewedItem key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

type ViewedItemProp = {
  product: Product;
};

const ViewedItem = ({ product }: ViewedItemProp) => {
  const fetcher = useFetcher();

  return (
    <div className={style.viewedItem}>
      <Link to={`/product/${product.id}`} state={product}>
        <div className={style.imgContainer}>
          <img src={product.styles[0].picture} alt={product.name} />
        </div>
      </Link>
      <fetcher.Form className={style.infoContainer} method="POST">
        <div className={style.name}>{product.name}</div>
        <div className={style.stars}>
          <StarContainer stars={product.stars} style={style} />
          <div className={style.ratings}>({product.ratings})</div>
        </div>
        <div className={style.price}>${product.price}</div>
        <button className={style.addButton}>Add to Cart</button>
        <input type="hidden" name="id" value={product.id} />
        <input type="hidden" name="name" value={product.name} />
        <input
          type="hidden"
          name="style"
          value={product.styles[0].description}
        />
        <input type="hidden" name="price" value={product.price} />
        <input type="hidden" name="quantity" value={1} />
        <input type="hidden" name="picture" value={product.styles[0].picture} />
        <input type="hidden" name="product" value={JSON.stringify(product)} />
      </fetcher.Form>
      <PopUp status={fetcher.state} data={fetcher.data} />
    </div>
  );
};

const QuantityCounter = ({
  cartItem,
  onIncreaseButtonClick,
  onDecreaseButtonClick,
}: {
  cartItem: CartItem;
  onIncreaseButtonClick: (id: string) => void;
  onDecreaseButtonClick: (id: string) => void;
}) => {
  return (
    <div className={style.quantityCounter}>
      <button
        type="button"
        id="increaseButton"
        aria-label="Increase quantity"
        className={style.increaseButton}
        onClick={() => onIncreaseButtonClick(cartItem.id)}
      >
        &#43;
      </button>
      <output
        htmlFor="increaseButton decreaseButton"
        name="quantity"
        className={style.counter}
      >
        {cartItem.quantity}
      </output>
      <button
        type="button"
        id="decreaseButton"
        aria-label="Decrease quantity"
        className={style.decreaseButton}
        onClick={() => onDecreaseButtonClick(cartItem.id)}
      >
        &#8722;
      </button>
    </div>
  );
};

const Item = ({
  cartItem,
  onIncreaseButtonClick,
  onDecreaseButtonClick,
  setPopUp,
}: {
  cartItem: CartItem;
  onIncreaseButtonClick: (id: string) => void;
  onDecreaseButtonClick: (id: string) => void;
  setPopUp: React.Dispatch<React.SetStateAction<CartItem | null>>;
}) => {
  const handleRemoveButtonClick = () => {
    setPopUp(cartItem);
  };

  return (
    <div className={style.item}>
      <Link to={`/product/${cartItem.id}`} state={cartItem.product}>
        <div className={style.imgContainer}>
          <img src={cartItem.picture} alt={cartItem.name} />
        </div>
      </Link>
      <div className={style.itemInfo_left}>
        <p className={style.name}>{cartItem.name}</p>
        {cartItem.style && <p className={style.style}>{cartItem.style}</p>}
        <button
          type="button"
          aria-label="remove Cartitem Button"
          className={style.removeButton}
          onClick={handleRemoveButtonClick}
        >
          Remove
        </button>
      </div>
      <div className={style.itemInfo_right}>
        <QuantityCounter
          cartItem={cartItem}
          onDecreaseButtonClick={onDecreaseButtonClick}
          onIncreaseButtonClick={onIncreaseButtonClick}
        />

        <p className={style.price}>
          {"$" + (cartItem.price * cartItem.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const ShoppingCart = () => {
  const cart = useLoaderData<Cart>();
  const {
    cartItems,
    handleQuantityDecrease,
    handleQuantityIncrease,
    handleUpdateCart,
  } = useCartItems(cart);
  const [popUpData, setPopUpData] = useState<CartItem | null>(null);

  useEffect(() => {
    const isCartsUnmatched = cart.length !== cartItems.length;

    if (isCartsUnmatched) {
      handleUpdateCart(cart);
    }
  }, [cart]);

  return (
    <div className={style.shoppingCart}>
      <div className={style.cart} role="cart">
        {cartItems.map((cartItem) => (
          <Item
            cartItem={cartItem}
            key={cartItem.id}
            onDecreaseButtonClick={handleQuantityDecrease}
            onIncreaseButtonClick={handleQuantityIncrease}
            setPopUp={setPopUpData}
          />
        ))}
      </div>
      <div className={style.rightSide}>
        <PriceContainer cart={cartItems} />

        <Outlet />
      </div>

      <CartPopUp
        popUpData={popUpData}
        setPopUp={setPopUpData}
        cartItems={cartItems}
      />
    </div>
  );
};

export default ShoppingCart;

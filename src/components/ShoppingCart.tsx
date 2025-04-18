import { Link, useLoaderData } from "react-router-dom";
import { Cart, CartItem } from "../products";
import style from "./ShoppingCart.module.css";
import { StarContainer } from "./StorePage";
import { useState } from "react";

const QuantityCounter = ({
  cartItem,
  onIncreaseButtonClick,
  onDecreaseButtonClick,
}: {
  cartItem: CartItem;
  onIncreaseButtonClick: (id: number) => void;
  onDecreaseButtonClick: (id: number) => void;
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
}: {
  cartItem: CartItem;
  onIncreaseButtonClick: (id: number) => void;
  onDecreaseButtonClick: (id: number) => void;
}) => {
  return (
    <div className={style.item}>
      <Link to={`/product/${cartItem.id}`}>
        <div className={style.imgContainer}>
          <img src={cartItem.picture} alt={cartItem.name} />
        </div>
      </Link>
      <div className={style.itemInfo_left}>
        <p className={style.name}>{cartItem.name}</p>
        {cartItem.style && <p className={style.style}>{cartItem.style}</p>}
        <button className={style.removeButton}>Remove</button>
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
  const [cartItems, setCartItems] = useState(cart);

  const handleQuantityIncrease = (id: number) => {
    const updatedCart = cartItems.map((cartItem) => {
      if (cartItem.id === id)
        return {
          ...cartItem,
          quantity: ++cartItem.quantity,
        };
      else return cartItem;
    });

    setCartItems(updatedCart);
  };

  const handleQuantityDecrease = (id: number) => {
    const currentCartItem = cartItems.find((cartItem) => cartItem.id);
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

  return (
    <form className={style.shoppingCart}>
      <div className={style.cart}>
        {cart.map((cartItem) => (
          <Item
            cartItem={cartItem}
            key={cartItem.id}
            onDecreaseButtonClick={handleQuantityDecrease}
            onIncreaseButtonClick={handleQuantityIncrease}
          />
        ))}
      </div>
      <div className={style.rightSide}>
        <div className={style.priceContainer}>
          <div className={style.topPrice}>
            <p>Subtotal</p>
            <p>$1200</p>
          </div>
          <div className={style.bottomPrice}>
            <p>Total Incl. Tax</p>
            <p>$1222</p>
          </div>
          <button className={style.checkoutButton}>Checkout</button>
        </div>
        <div className={style.viewedList}>
          <p className={style.heading}>Viewed Items</p>
          {/* <div className={style.viewedItem}>
            <a href="">
              <div className={style.imgContainer}>
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className={style.infoContainer}>
              <div className={style.name}>dufflebag</div>
              <div className={style.stars}>
                <StarContainer stars={3} style={style} />
                <div className={style.ratings}>({3})</div>
              </div>
              <div className={style.price}>${1000}</div>
              <button className={style.addButton}>Add to Cart</button>
            </div>
          </div>
          <div className={style.viewedItem}>
            <a href="">
              <div className={style.imgContainer}>
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className={style.infoContainer}>
              <div className={style.name}>dufflebag</div>
              <div className={style.stars}>
                <StarContainer stars={3} style={style} />
                <div className={style.ratings}>({3})</div>
              </div>
              <div className={style.price}>${1000}</div>
              <button className={style.addButton}>Add to Cart</button>
            </div>
          </div>
          <div className={style.viewedItem}>
            <a href="">
              <div className={style.imgContainer}>
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className={style.infoContainer}>
              <div className={style.name}>dufflebag</div>
              <div className={style.stars}>
                <StarContainer stars={3} style={style} />
                <div className={style.ratings}>({3})</div>
              </div>
              <div className={style.price}>${1000}</div>
              <button className={style.addButton}>Add to Cart</button>
            </div>
          </div>
          <div className={style.viewedItem}>
            <a href="">
              <div className={style.imgContainer}>
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className={style.infoContainer}>
              <div className={style.name}>dufflebag</div>
              <div className={style.stars}>
                <StarContainer stars={3} style={style} />
                <div className={style.ratings}>({3})</div>
              </div>
              <div className={style.price}>${1000}</div>
              <button className={style.addButton}>Add to Cart</button>
            </div>
          </div> */}
        </div>
      </div>
    </form>
  );
};

export default ShoppingCart;

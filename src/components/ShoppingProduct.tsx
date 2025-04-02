import React, { useState } from "react";
import { Product, Style } from "../products";
import style from "./ShoppingProduct.module.css";
import { useLocation } from "react-router-dom";

export const Picture = ({ product }: { product: Product }) => {
  const currentStyle = product.styles.filter(
    (productStyle) => productStyle.isCurrentStyle
  )[0];

  return (
    <div className={style.picture}>
      <div className={style.imgContainer}>
        <img
          src={currentStyle.picture}
          alt={product.name + " " + currentStyle.description}
        />
      </div>

      <ColorTabs styles={product.styles} />
    </div>
  );
};

type ColorTabsProps = {
  styles: Style[];
};

export const ColorTabs = ({ styles }: ColorTabsProps) => {
  if (styles.length === 1) return null;

  return (
    <div className={style.colorTabs}>
      Style:
      {styles.map((productStyle) => (
        <button className={style.colorTab}>{productStyle.description}</button>
      ))}
    </div>
  );
};

const ShoppingProduct = () => {
  const location = useLocation();
  const state = location.state as Product;
  const [product, setProduct] = useState<Product>(state);

  return (
    <div className={style.shoppingProduct}>
      <Picture product={product} />
      {/* <div className={style.picture}>
        <div className={style.imgContainer}>
          <img src="" alt="" />
        </div>
        <div className={style.colorTabs}>
          Style:
          <button className={style.colorTab}>Red</button>
        </div>
      </div> */}
      <div className={style.productdetails}>
        <p>Leather Bag</p>
        <div className={style.stars}>
          <div className={style.stars_container}>
            <div className={style.star + style.on}></div>
            <div className={style.star + style.on}></div>
            <div className={style.star + style.on}></div>
            <div className={style.star + style.on}></div>
            <div className={style.star + style.on}></div>
          </div>
          <div className={style.ratings}>(13)</div>
        </div>
        <p>$200</p>
        <p className={style.style}>Style: Red</p>
      </div>
      <div className={style.productToCart}>
        <p className={style.quantity}>Quantity</p>
        <div className={style.quantityCounter}>
          <button className={style.increaseButton}>&#43;</button>
          <p className={style.counter}>1</p>
          <button className={style.decreaseButton}>&#8722;</button>
        </div>
        <button className={style.addButton}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ShoppingProduct;

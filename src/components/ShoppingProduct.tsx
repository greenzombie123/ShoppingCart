import React, { useState } from "react";
import { Product, Style } from "../products";
import style from "./ShoppingProduct.module.css";
import { useLocation } from "react-router-dom";

type PictureProps = {
  product: Product;
  onColorTabClick: (index: number, product: Product) => () => void;
};

export const Picture = ({ product, onColorTabClick }: PictureProps) => {
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

      <ColorTabs
        styles={product.styles}
        onColorTabClick={onColorTabClick}
        product={product}
      />
    </div>
  );
};

type ColorTabsProps = {
  styles: Style[];
  onColorTabClick: (index: number, product: Product) => () => void;
  product: Product;
};

export const ColorTabs = ({
  styles,
  onColorTabClick,
  product,
}: ColorTabsProps) => {
  if (styles.length === 1) return null;

  return (
    <div className={style.colorTabs}>
      Style:
      {styles.map((productStyle, index) => (
        <button
          className={style.colorTab}
          onClick={onColorTabClick(index, product)}
        >
          {productStyle.description}
        </button>
      ))}
    </div>
  );
};

const ShoppingProduct = () => {
  const location = useLocation();
  const state = location.state as Product;
  const [product, setProduct] = useState<Product>(state);

  const handleChangeStyle = (index: number, product: Product) => () => {
    setProduct({
      ...product,
      styles: product.styles.map((productStyle, styleIndex) =>
        index === styleIndex
          ? { ...productStyle, isCurrentStyle: true }
          : { ...productStyle, isCurrentStyle: false }
      ),
    });
  };

  return (
    <div className={style.shoppingProduct}>
      <Picture product={product} onColorTabClick={handleChangeStyle}/>

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

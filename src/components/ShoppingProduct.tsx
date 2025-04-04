import React, { useState } from "react";
import { Product, Style } from "../products";
import style from "./ShoppingProduct.module.css";
import { useLocation } from "react-router-dom";
import { StarContainer } from "./StorePage";
import { changeToPrice } from "../utilities/utility";

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
          aria-label="picture"
        />
      </div>

      <ColorTabs
        styles={product.styles}
        onColorTabClick={onColorTabClick}
        product={product}
        key={product.id}
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
          key={productStyle.description}
        >
          {productStyle.description}
        </button>
      ))}
    </div>
  );
};

export const ProductDetails = ({ product }: { product: Product }) => {
  const description = product.styles.find(
    (productStyle) => productStyle.isCurrentStyle
  )?.description;

  return (
    <div className={style.productdetails}>
      <p>{product.name}</p>
      <div className={style.stars}>
        <StarContainer stars={product.stars} style={style} />
        <div className={style.ratings}>({product.ratings})</div>
      </div>
      <p>{changeToPrice(product.price)}</p>
      <p className={style.style}>{description && `Style: ${description}`}</p>
    </div>
  );
};

export const ProductToCart = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityDecrease = () => {
    if (quantity !== 1) setQuantity(quantity - 1);
  };

  return (
    <div className={style.productToCart}>
      <p className={style.quantity}>Quantity</p>
      <div className={style.quantityCounter}>
        <button
          id="increaseButton"
          aria-label="Increase quantity"
          className={style.increaseButton}
          onClick={handleQuantityIncrease}
        >
          &#43;
        </button>
        <output
          htmlFor="increaseButton decreaseButton"
          name="quantity"
          className={style.counter}
        >
          {quantity}
        </output>
        <button
          id="decreaseButton"
          aria-label="Decrease quantity"
          className={style.decreaseButton}
          onClick={handleQuantityDecrease}
        >
          &#8722;
        </button>
      </div>
      <button className={style.addButton}>Add to Cart</button>
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
      <Picture product={product} onColorTabClick={handleChangeStyle} />
      <ProductDetails product={product} />
      <ProductToCart product={product}/>
    </div>
  );
};

export default ShoppingProduct;

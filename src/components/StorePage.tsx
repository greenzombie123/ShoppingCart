import { Link, useLoaderData } from "react-router-dom";
import style from "./StorePage.module.css";
import { Product } from "../products";

type StoreItemProps = {
  product: Product;
};

export const StoreItem = ({ product }: StoreItemProps) => {
  return (
    <div className={style.itemCard} key={product.name}>
      <Link to={`/product/${product.id}`} state={product}>
        <div className={style.imgContainer}>
          <img src={product.styles[0].picture} alt={product.name} />
          <div className={style.bestSeller}>BestSeller</div>
          <div className={style.heartContainer}>
            <div className={style.heart}></div>
            <p className={style.number}>2</p>
          </div>
        </div>
        <div className={style.itemInfo}>
          <div className={style.styles}></div>
          <div className={style.name}>{product.name}</div>
          <div className={style.stars}>
            <StarContainer stars={product.stars} style={style}/>

            <div className={style.ratings}>({product.ratings})</div>
          </div>
          <div className={style.price}>${product.price}</div>
        </div>
      </Link>
    </div>
  );
};

export const StarContainer = ({ stars, style }: { stars: number, style:CSSModuleClasses }) => {
  const starImages = [];

  for (let index = 1; index < 6; index++) {
    // Only apply on classname if the number of star is more than the current index
    const starStyle = stars >= index ? style.star + " " + style.on : style.star;
    const star = (
      <span
        key={index}
        role="img"
        aria-label="star"
        className={starStyle}
      ></span>
    );
    starImages.push(star);
  }

  return <div className={style.stars_container}>{starImages}</div>;
};

const StorePage = () => {
  const products: Product[] = useLoaderData();
  const storeItems = products.map((product) => (
    <StoreItem product={product} key={product.id} />
  ));

  return (
    <div className={style.items} data-testid="store_page">
      {storeItems}
    </div>
  );
};

export default StorePage;

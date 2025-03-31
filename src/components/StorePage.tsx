import { Link } from "react-router-dom";
import style from "./StorePage.module.css";
import { Product } from "../products";

type StoreItemProps = {
  product:Product
}

export const StoreItem = ({product}:StoreItemProps) => {

  return (
    <div className={style.itemCard}>
      <Link to={`/product/${product.id}`}>
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
            <div className={style.stars_container}>
              <div className={style.star + " " + style.on}></div>
              <div className={style.star + " " + style.on}></div>
              <div className={style.star + " " + style.on}></div>
              <div className={style.star}></div>
              <div className={style.star}></div>
            </div>
            <div className={style.ratings}>({product.ratings})</div>
          </div>
          <div className={style.price}>${product.price}</div>
        </div>
      </Link>
    </div>
  );
};

const StorePage = () => {
  return <div className={style.items} data-testid="store_page">
    
  </div>;
};

export default StorePage;

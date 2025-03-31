import { Link } from "react-router-dom";
import style from "./StorePage.module.css";

const StorePage = () => {
  return (
    <div className={style.items} data-testid='store_page'>
      <div className={style.itemCard}>
        <Link to="">
          <div className={style.imgContainer}>
            <img src={""} alt="" />
            <div className={style.bestSeller}>BestSeller</div>
            <div className={style.heartContainer}>
              <div className={style.heart}></div>
              <p className={style.number}>2</p>
            </div>
          </div>
          <div className={style.itemInfo}>
            <div className={style.styles}></div>
            <div className={style.name}>dufflebag</div>
            <div className={style.stars}>
              <div className={style.stars_container}>
                <div className={style.star + " " + style.on}></div>
                <div className={style.star + " " + style.on}></div>
                <div className={style.star + " " + style.on}></div>
                <div className={style.star}></div>
                <div className={style.star}></div>
              </div>
              <div className={style.ratings}>(13)</div>
            </div>
            <div className={style.price}>$100</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StorePage;

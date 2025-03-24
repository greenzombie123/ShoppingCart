import { useLoaderData } from "react-router-dom";
import style from "./Carousel.module.css";
import { Product } from "../products";

const Carousel = () => {
  const products = useLoaderData<Product[]>();

  return (
    <div className={style.carouselContainer} data-testid="a">
      <button className={style.leftButton}></button>
      <div className={style.carousel_wrapper}>
        <Slider products={products}/>
        <div className="navigation_list">
          <div>
            <a href="">
              <img src="./assets/dufflebag.webp" alt="" />
            </a>
          </div>
          <div>
            <a href="">
              <img src="./assets/leatherbag.webp" alt="" />
            </a>
          </div>
          <div>
            <a href="">
              <img src="./assets/pinkbag.webp" alt="" />
            </a>
          </div>
          <div>
            <a href="">
              <img src="./assets/leatherbag.webp" alt="" />
            </a>
          </div>
          <div>
            <a href="">
              <img src="./assets/pinkbag.webp" alt="" />
            </a>
          </div>
        </div>
      </div>
      <button className={style.rightButton}></button>
    </div>
  );
};

interface SliderProps {
  products:Product[]
}

export const Slider = ({products}:SliderProps) => {
  return <div className={style.carousel}>
    
  </div>;
};

export const Slide = () => {
  return (
    <div className={style.slide} data-testId="slide">
      <img src="" alt="" />
      <div className={style.itemInfo}>
        <div className={style.name}>leather bag f2fwefw</div>
        <div className={style.price}>$100</div>
      </div>
    </div>
  );
};

export default Carousel;

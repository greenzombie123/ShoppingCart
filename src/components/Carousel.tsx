import { Link, useLoaderData } from "react-router-dom";
import style from "./Carousel.module.css";
import { Product } from "../products";

const Carousel = () => {
  const products = useLoaderData<Product[]>();

  return (
    <div className={style.carouselContainer} data-testid="a">
      <button className={style.leftButton}></button>
      <div className={style.carousel_wrapper}>
        <Slider products={products} />
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
  products: Product[];
}

export const Slider = ({ products }: SliderProps) => {
  return (
    <div className={style.carousel}>
      {products.map((product) => (
        <Slide product={product} />
      ))}
    </div>
  );
};

interface SlideProps {
  product: Product;
}

export const Slide = ({ product }: SlideProps) => {
  return (
    <Link key={product.id} to={`product/${product.id}`} className={style.slide} data-testid="slide">
      <img src={product.styles[0].picture} alt={product.name} />
      <div className={style.itemInfo}>
        <div className={style.name}>{product.name}</div>
        <div className={style.price}>{product.price}</div>
      </div>
    </Link>
  );
};

export default Carousel;

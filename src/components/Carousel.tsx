import { Link, useLoaderData } from "react-router-dom";
import style from "./Carousel.module.css";
import { Product } from "../products";
import { useEffect, useRef, useState } from "react";

type SliderState = 0 | 1 | 2 | 3 | 4;

const Carousel = () => {
  const products = useLoaderData<Product[]>();
  const [currentSlide, setCurrentSlide] = useState<SliderState>(0);

  const handleSlideChange = (number: 1 | -1) => () => {
    const nextSlide = currentSlide + number;
    const newSlide: SliderState =
      nextSlide === 0
        ? 0
        : nextSlide === 2
        ? 2
        : nextSlide === 3
        ? 3
        : nextSlide === 4
        ? 4
        : nextSlide === 1
        ? 1
        : currentSlide;
    setCurrentSlide(newSlide);
  };

  return (
    <div className={style.carouselContainer} data-testid="a">
      <button
        className={style.leftButton}
        onClick={handleSlideChange(-1)}
      ></button>
      <div className={style.carousel_wrapper}>
        <Slider products={products} currentSlide={currentSlide} />
        <NavigationList products={products} />
      </div>
      <button
        className={style.rightButton}
        onClick={handleSlideChange(1)}
      ></button>
    </div>
  );
};

interface NavigationListProps {
  products: Product[];
}

export const NavigationList = ({ products }: NavigationListProps) => {
  const navListItems = products.map((product) => (
    <li key={product.name}>
      <a href="">
        <img src={product.styles[0].picture} alt={product.name} />
      </a>
    </li>
  ));

  return <ul className={style.navigation_list}>{navListItems}</ul>;
};

interface SliderProps {
  products: Product[];
  currentSlide: SliderState;
}

export const Slider = ({ products, currentSlide }: SliderProps) => {
  return (
    <div className={style.carousel}>
      {products.map((product, index) => (
        <Slide
          key={product.name}
          product={product}
          isCurrent={currentSlide === index}
          currentSlide={currentSlide}
        />
      ))}
    </div>
  );
};

interface SlideProps {
  product: Product;
  isCurrent: boolean;
  currentSlide: SliderState;
}

export const Slide = ({ product, isCurrent, currentSlide }: SlideProps) => {
  const slideRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (isCurrent && slideRef.current !== null) {
      slideRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [isCurrent, currentSlide]);

  return (
    <Link
      key={product.id}
      to={`product/${product.id}`}
      className={style.slide}
      data-testid="slide"
      ref={slideRef}
    >
      <img src={product.styles[0].picture} alt={product.name} />
      <div className={style.itemInfo}>
        <div className={style.name}>{product.name}</div>
        <div className={style.price}>${product.price}</div>
      </div>
    </Link>
  );
};

export default Carousel;

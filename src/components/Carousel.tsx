import style from "./Carousel.module.css";

const Carousel = () => {
  return (
    <div className={style.carouselContainer} data-testid="a">
      <button className={style.leftButton}></button>
      <div className={style.carousel_wrapper}>
        <Slider/>
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

export const Slider = () => {
  return <div className={style.carousel}>
    
  </div>;
};

export const Slide = () => {
  return (
    <div className={style.slide} data-testId="slide">
      <img src="" alt="" />
      <div className={style.itemInfo}>
        <div className={style.name}>
          leather bag f2fwefw
        </div>
        <div className={style.price}>$100</div>
      </div>
    </div>
  );
};

export default Carousel;

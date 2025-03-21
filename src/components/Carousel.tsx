import style from "./Carousel.module.css";

const Carousel = () => {
  return (
    <div className={style.carouselContainer} data-testid="a">
      <button className={style.leftButton}></button>
      <div className={style.carousel_wrapper}>
                <div className={style.carousel}>
                    
                </div>
                <div className="navigation_list">
                    <div><a href=""><img src="./assets/dufflebag.webp" alt=""/></a></div>
                    <div><a href=""><img src="./assets/leatherbag.webp" alt=""/></a></div>
                    <div><a href=""><img src="./assets/pinkbag.webp" alt=""/></a></div>
                    <div><a href=""><img src="./assets/leatherbag.webp"alt=""/></a></div>
                    <div><a href=""><img src="./assets/pinkbag.webp" alt=""/></a></div>
                </div>
            </div>
      <button className={style.rightButton}></button>
    </div>
  );
};

export default Carousel;

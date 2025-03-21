import style from "./Carousel.module.css";

const Carousel = () => {
  return (
    <div className={style.carouselContainer} data-testid="a">
      <button className={style.leftButton}></button>
      {/* <div className="carousel_wrapper">
                <div className="carousel">
                    <div className="slide"><img src="./assets/dufflebag.webp" alt=""/></div>
                    <div className="slide mainSlide"><img src="./assets/leatherbag.webp" alt=""/>
                        <div className="itemInfo">
                            <div className="name">leather bag</div>
                            <div className="price">$100</div>
                        </div>
                    </div>
                    <div className="slide"><img src="./assets/pinkbag.webp" alt=""/></div>
                    <div className="slide"><img src="./assets/leatherbag.webp" alt=""/></div>
                    <div className="slide"><img src="./assets/pinkbag.webp" alt=""/></div>
                </div>
                <div className="navigation_list">
                    <div><a href=""><img src="./assets/dufflebag.webp" alt=""/></a></div>
                    <div><a href=""><img src="./assets/leatherbag.webp" alt=""/></a></div>
                    <div><a href=""><img src="./assets/pinkbag.webp" alt=""/></a></div>
                    <div><a href=""><img src="./assets/leatherbag.webp"alt=""/></a></div>
                    <div><a href=""><img src="./assets/pinkbag.webp" alt=""/></a></div>
                </div>
            </div> */}
      <button className={style.rightButton}></button>
    </div>
  );
};

export default Carousel;

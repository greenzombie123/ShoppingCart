import style from "./ShoppingCart.module.css";
import { StarContainer } from "./StorePage";
import starsStyle from "./StorePage.module.css";

const ShoppingCart = () => {
  return (
    <form className={style.shoppingCart}>
      <div className={style.cart}>
        <div className={style.item}>
          <a href="#">
            <div className={style.imgContainer}>
              <img src="./assets/pinkbag.webp" alt="" />
            </div>
          </a>
          <div className={style.itemInfo_left}>
            <p className={style.name}>Pink Bag</p>
            <p className={style.style}>Pink</p>
            <button className={style.removeButton}>Remove</button>
          </div>
          <div className={style.itemInfo_right}>
            <div className={style.quantityCounter}>
              <button className={style.increaseButton}>&#43;</button>
              <p className={style.counter}>1</p>
              <button className={style.decreaseButton}>&#8722;</button>
            </div>
            <p className={style.price}>$100</p>
          </div>
        </div>
        <div className={style.item}>
          <a href="#">
            <div className={style.imgContainer}>
              <img src="./assets/pinkbag.webp" alt="" />
            </div>
          </a>
          <div className={style.itemInfo_left}>
            <p className={style.name}>Pink Bag</p>
            <p className={style.style}>Pink</p>
            <button className={style.removeButton}>Remove</button>
          </div>
          <div className={style.itemInfo_right}>
            <div className={style.quantityCounter}>
              <button className={style.increaseButton}>&#43;</button>
              <p className={style.counter}>1</p>
              <button className={style.decreaseButton}>&#8722;</button>
            </div>
            <p className={style.price}>$100</p>
          </div>
        </div>
        <div className={style.item}>
          <a href="#">
            <div className={style.imgContainer}>
              <img src="./assets/pinkbag.webp" alt="" />
            </div>
          </a>
          <div className={style.itemInfo_left}>
            <p className={style.name}>Pink Bag</p>
            <p className={style.style}>Pink</p>
            <button className={style.removeButton}>Remove</button>
          </div>
          <div className={style.itemInfo_right}>
            <div className={style.quantityCounter}>
              <button className={style.increaseButton}>&#43;</button>
              <p className={style.counter}>1</p>
              <button className={style.decreaseButton}>&#8722;</button>
            </div>
            <p className={style.price}>$100</p>
          </div>
        </div>
      </div>
      <div className={style.rightSide}>
        <div className={style.priceContainer}>
          <div className={style.topPrice}>
            <p>Subtotal</p>
            <p>$1200</p>
          </div>
          <div className={style.bottomPrice}>
            <p>Total Incl. Tax</p>
            <p>$1222</p>
          </div>
          <button className={style.checkoutButton}>Checkout</button>
        </div>
        <div className={style.viewedList}>
          <p className={style.heading}>Viewed Items</p>
          <div className={style.viewedItem}>
            <a href="">
              <div className={style.imgContainer}>
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className={style.infoContainer}>
              <div className={style.name}>dufflebag</div>
              <div className={style.stars}>
                <StarContainer stars={3} style={style} />
                <div className={style.ratings}>({3})</div>
              </div>
              <div className={style.price}>${1000}</div>
              <button className={style.addButton}>Add to Cart</button>
            </div>
          </div>
          <div className={style.viewedItem}>
            <a href="">
              <div className={style.imgContainer}>
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className={style.infoContainer}>
              <div className={style.name}>dufflebag</div>
              <div className={style.stars}>
                <StarContainer stars={3} style={style} />
                <div className={style.ratings}>({3})</div>
              </div>
              <div className={style.price}>${1000}</div>
              <button className={style.addButton}>Add to Cart</button>
            </div>
          </div>  
          <div className={style.viewedItem}>
            <a href="">
              <div className={style.imgContainer}>
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className={style.infoContainer}>
              <div className={style.name}>dufflebag</div>
              <div className={style.stars}>
                <StarContainer stars={3} style={style} />
                <div className={style.ratings}>({3})</div>
              </div>
              <div className={style.price}>${1000}</div>
              <button className={style.addButton}>Add to Cart</button>
            </div>
          </div>  
          <div className={style.viewedItem}>
            <a href="">
              <div className={style.imgContainer}>
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className={style.infoContainer}>
              <div className={style.name}>dufflebag</div>
              <div className={style.stars}>
                <StarContainer stars={3} style={style} />
                <div className={style.ratings}>({3})</div>
              </div>
              <div className={style.price}>${1000}</div>
              <button className={style.addButton}>Add to Cart</button>
            </div>
          </div>  
        </div>
      </div>
    </form>
  );
};

export default ShoppingCart;

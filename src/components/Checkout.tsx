import style from "./Checkout.module.css";

const Checkout = () => {

  return (
    <form className="checkout">
      <div className="leftSide">
        <h1 className="topHeading">Checkout</h1>
        <h2 className="heading">Shipping Information</h2>

        <div className="radiobuttons">
          <p className="heading">Type of Delivery</p>
          <div className="buttons">
            <label for="homedelivery">
              Delivery
              <input type="radio" id="homedelivery" name="delivery" />
            </label>
            <label for="pickup">
              Pick Up
              <input type="radio" id="pickup" name="delivery" />
            </label>
          </div>
        </div>

        <div className="inputs">
          <label for="firstname">
            First Name
            <input type="text" name="firstname" id="firstname" />
          </label>
          <label>
            Middle Name*
            <input type="text" name="middlename" id="middlename" />
          </label>
          <label>
            Last Name
            <input type="text" name="lastname" id="lastname" />
          </label>
        </div>

        <label for="phoone">
          Phone Number
          <input type="text" name="city" id="city" />
        </label>
        <label for="email">
          Email Address
          <input type="text" name="email" id="email" />
        </label>
        <label for="country">
          Country
          <select name="country" id="country">
            <option value="" selected>
              Choose a country
            </option>
            <option value="United States of America">
              United States of America
            </option>
            <option value="Japan">Japan</option>
          </select>
        </label>
        <label for="city">
          City/Town
          <input type="text" name="city" id="city" />
        </label>
        <label for="state">
          State/Region/Prefecture
          <input type="text" name="state" id="state" />
        </label>
        <label for="zipcode">
          Zip Code
          <input type="number" name="zip" id="zip" />
        </label>
        <label for="address">
          Street Address
          <input type="text" name="address" id="address" />
        </label>
        <label for="terms" className="lastInput">
          <input type="radio" name="terms" id="terms" />I have read and agree to
          the Terms and Conditions
        </label>
      </div>
      <div className="rightSide">
        <div className="viewedList">
          <p className="heading">Review Your Cart</p>
          <div className="viewedItem">
            <a href="">
              <div className="imgContainer">
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className="infoContainer">
              <p className="name">Pink Bag</p>
              <p className="quantity">Quantity: 1</p>
              <p className="price">$10.00</p>
            </div>
          </div>
          <div className="viewedItem">
            <a href="">
              <div className="imgContainer">
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className="infoContainer">
              <p className="name">Pink Bag</p>
              <p className="quantity">Quantity: 1</p>
              <p className="price">$10.00</p>
            </div>
          </div>
          <div className="viewedItem">
            <a href="">
              <div className="imgContainer">
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className="infoContainer">
              <p className="name">Pink Bag</p>
              <p className="quantity">Quantity: 1</p>
              <p className="price">$10.00</p>
            </div>
          </div>
          <div className="viewedItem">
            <a href="">
              <div className="imgContainer">
                <img src="./assets/dufflebag.webp" alt="" />
              </div>
            </a>
            <div className="infoContainer">
              <p className="name">Pink Bag</p>
              <p className="quantity">Quantity: 1</p>
              <p className="price">$10.00</p>
            </div>
          </div>
        </div>
        <div className="radiobuttons threeButtons">
          <p className="heading">Payment Method</p>
          <div className="buttons">
            <label for="creditcard">
              Credit Card
              <input type="radio" id="creditcard" name="payment" />
            </label>
            <label for="paypal">
              Paypal
              <input type="radio" id="paypal" name="payment" />
            </label>
            <label for="gmoney">
              G Money
              <input type="radio" id="gmoney" name="payment" />
            </label>
          </div>
        </div>
        <div className="priceContainer">
          <div className="price">
            <p>Subtotal</p>
            <p>$200</p>
          </div>
          <div className="price">
            <p>Shipping</p>
            <p>$200</p>
          </div>
          <div className="price">
            <p>Discounts</p>
            <p>$200</p>
          </div>
          <div className="price">
            <p>Total</p>
            <p>$200</p>
          </div>
          <button className="checkoutButton">Pay</button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;

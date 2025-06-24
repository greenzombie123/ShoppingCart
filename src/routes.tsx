import { RouteObject } from "react-router-dom";
import App from "./App";
import {
  addToCart,
  getCart,
  getRandomProducts,
  getStoreItems,
  getViewedItems,
  moveToCheckout,
  updateCart,
} from "./Loaders";
import Carousel from "./components/Carousel";
import StorePage from "./components/StorePage";
import ShoppingProduct from "./components/ShoppingProduct";
import ShoppingCart, { ViewedItemsContainer } from "./components/ShoppingCart";
import Checkout from "./components/Checkout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: getCart,
    children: [
      {
        loader: getRandomProducts,
        element: <Carousel />,
        index: true,
      },
      {
        loader: getStoreItems,
        element: <StorePage />,
        path: "store/:category",
      },
      {
        action: addToCart,
        element: <ShoppingProduct />,
        path: "product/:id",
      },
      {
        loader: getCart,
        element: <ShoppingCart />,
        path: "mycart",
        action: updateCart,
        children: [
          {
            loader: getViewedItems,
            index: true,
            element: <ViewedItemsContainer />,
            action: addToCart,
          },
        ],
      },
      {
        element:<Checkout/>,
        path:"checkout"
      }
    ],
  },
];

export default routes;

import { RouteObject } from "react-router-dom";
import App from "./App";
import {
  addToCart,
  getCart,
  getRandomProducts,
  getStoreItems,
  getViewedItems,
  removeCartItem,
} from "./Loaders";
import Carousel from "./components/Carousel";
import StorePage from "./components/StorePage";
import ShoppingProduct from "./components/ShoppingProduct";
import ShoppingCart, { ViewedItemsContainer } from "./components/ShoppingCart";

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
        action: removeCartItem,
        children: [
          {
            loader: getViewedItems,
            index: true,
            element: <ViewedItemsContainer />,
          },
        ],
      },
    ],
  },
];

export default routes;

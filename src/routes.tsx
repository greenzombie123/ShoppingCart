import { RouteObject } from "react-router-dom";
import App from "./App";
import { getCart, getRandomProducts } from "./Loaders";
import Carousel from "./components/Carousel";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: getCart,
    HydrateFallback:null,
    // loader:async ()=>await 2,
    children: [
      {
        loader:getRandomProducts,
        element: <Carousel />,
        index:true,
      },
    ],
  },
];

export default routes;

import { RouteObject } from "react-router-dom";
import App from "./App";
import { getCart, getRandomProducts } from "./Loaders";
import Carousel from "./components/Carousel";
import StorePage from "./components/StorePage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: getCart,
    HydrateFallback:null,
    children: [
      {
        loader:getRandomProducts,
        element: <Carousel />,
        index:true,
      },
      {
        element:<StorePage/>,
        path:"/store"
      }
    ],
  },
];

export default routes;

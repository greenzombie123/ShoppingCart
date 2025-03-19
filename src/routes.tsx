import { RouteObject } from "react-router-dom";
import App from "./App";
import { getCart } from "./Loaders";
import Carousel from "./components/Carousel";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    loader: getCart,
    children: [
      {
        element: <Carousel />,
        index:true
      },
    ],
  },
];

export default routes;

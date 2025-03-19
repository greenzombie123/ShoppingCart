
import { RouteObject } from "react-router-dom";
import App from "./App";
import { getCart } from "./Loaders";

const routes:RouteObject[] = [
    {
        path:"/",
        element:<App/>,
        loader:getCart
    }
]

export default routes
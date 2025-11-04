import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import Home from "../pages/home/Home";
import ViewProduct from "../pages/viewProduct/ViewProduct";
import Favourites from "../pages/favourites/Favourites";
import Basket from "../pages/basket/Basket";
import FilteredPage from "../pages/filteredPage/FilteredPage";
import { Catalog } from "../pages/catalog/Catalog";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: "/products/:id",
                element: <ViewProduct />
            },
            {
                path: "/favourites",
                element: <Favourites />
            },
            {
                path: "/basket",
                element: <Basket />
            },
            {
                path: "/filtered",
                element: <FilteredPage />
            },
            {
                path: "/catalog",
                element: <Catalog />
            }
        ]
    }
])
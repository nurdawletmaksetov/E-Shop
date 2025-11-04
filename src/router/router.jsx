import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import Home from "../pages/home/Home";
import ViewProduct from "../pages/viewProduct/ViewProduct";
import Favourites from "../pages/favourites/Favourites";
import Basket from "../pages/basket/Basket";
import FilteredPage from "../pages/filteredPage/FilteredPage";
import { Catalog } from "../pages/catalog/Catalog";
import Login from "../pages/login/Login";
import { PrivateRoute } from "../privateRoute/PrivateRoute";

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
                element: (
                    <PrivateRoute>
                        <Basket />
                    </PrivateRoute>
                )
            },
            {
                path: "/filtered",
                element: <FilteredPage />
            },
            {
                path: "/catalog",
                element: <Catalog />
            },
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
])
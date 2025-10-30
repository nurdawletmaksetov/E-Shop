import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout";
import Home from "../pages/home/Home";
import ViewProduct from "../pages/viewProduct/ViewProduct";

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
            }
        ]
    }
])
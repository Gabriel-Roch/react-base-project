import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import PageLogin from "../pages/login/PageLogin"
import { ControlProduct } from "../pages/product/controlProduct/ControlProduct"
import { ControlSupplier } from "../pages/product/controlSupplier/PageSupplier"
import  Report  from "../pages/report/Report"
import { PreOrder } from "../pages/preorder/PreOrder"


export const routes = createBrowserRouter([
    { path: "/login", element: <PageLogin /> },
    {
        path: "/",
        element: <App />,
        children: [
            {   
                path : "/",
                element: <Report />
            },
            {
                path: "/product",
                element: <ControlProduct />
            },
            {
                path: "/product/supplier",
                element: <ControlSupplier />

            },
            {
                path: "sale",
                element: <PreOrder />
            }
        ]
    },

])
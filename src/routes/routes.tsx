import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import { Register } from "../pages/Exemple/register"

export const routes = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/register", element: <Register /> }
])
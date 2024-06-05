import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../page/About";
import Contact from "../page/Contact";
import Login from "../page/Login";
import Register from "../page/Register";
import AdminLayout from "../components/layout/AdminLayout";
import AddService from "../page/AddService";
import Home from "../page/Home";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true, //to set default route when loaded initially
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'contact',
                element: <Contact />
            },
        ],
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/admin',
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <AddService/>
            },
        ],
    },
]);

// For main route / should be given || for children directly type route name ex 'about' 
export default routes;
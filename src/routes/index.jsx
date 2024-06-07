import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../page/About";
import Contact from "../page/Contact";
import Login from "../page/Login";
import Register from "../page/Register";
import AdminLayout from "../components/layout/AdminLayout";
import AddService from "../page/AddService";
import Home from "../page/Home";
import PrivateRoute from "./PrivateRoute";
import Services from "../page/Services";
import Bookings from "../page/Bookings";


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
                element: <PrivateRoute><About /></PrivateRoute>
            },
            {
                path: 'contact',
                element: <Contact />
            },
            {
                path: 'services',
                element: <PrivateRoute><Services /></PrivateRoute>
            },
            {
                path: 'booking/:id',
                element: <Bookings />
            },
        ],
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AddService />
            },
        ],
    },
]);

// For main route / should be given || for children directly type route name ex 'about' 
export default routes;
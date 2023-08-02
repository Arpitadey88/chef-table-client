import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Private from "../pages/Shared/Private/Private";
import Dashboard from "../Layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AdminRoute from "./AdminRoutes";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import Payment from "../pages/Dashboard/Payment/Payment";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import UpdateItems from "../pages/Dashboard/UpdateItems/UpdateItems";
import ContactUs from "../pages/Home/ContactUs/ContactUs";
import Reservation from "../pages/Dashboard/Reservation/Reservation";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "menu",
                element: <Menu></Menu>
            },
            {
                path: "order/:category",
                element: <Order></Order>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            },
            {
                path: "contact",
                element: <ContactUs></ContactUs>
            },
            {
                path: "private",
                element: <PrivateRoute><Private></Private></PrivateRoute>
            },
        ],
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [

            // user routes
            {
                path: 'userdashboard',
                element: <UserDashboard></UserDashboard>
            },
            {
                path: 'mycart',
                element: <MyCart></MyCart>
            },
            {
                path: "reservations",
                element: <Reservation></Reservation>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },

            // admin routes
            {
                path: 'admindashboard',
                element: <AdminDashboard></AdminDashboard>
            },
            {
                path: 'allusers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'addItem',
                element: <AdminRoute><AddItem></AddItem></AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>
                // loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`)
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            }
        ]
    }
]);
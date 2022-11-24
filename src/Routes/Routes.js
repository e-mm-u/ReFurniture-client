import { createBrowserRouter } from "react-router-dom";
import AllBuyers from "../components/Dashboard/admin/AllBuyers";
import AllSeller from "../components/Dashboard/admin/AllSeller";
import ReportedProducts from "../components/Dashboard/admin/ReportedProducts";
import MyPurchase from "../components/Dashboard/buyer/MyPurchase";
import Wishlist from "../components/Dashboard/buyer/Wishlist";
import Home from "../components/Home/Home";
import Login from "../components/Shared/Login/Login";
import SignUp from "../components/Shared/Signup/SignUp";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";

export const routes = createBrowserRouter([
    {
        path : '/',
        element : <Main></Main>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            },
            {
                path : '/signup',
                element : <SignUp></SignUp>
            },
            {
                path : '/login',
                element : <Login></Login>
            },
            {
                path : '/dashboard',
                element : <DashboardLayout></DashboardLayout>,
                children : [
                    {
                        path : '/dashboard/allsellers',
                        element : <AllSeller></AllSeller>
                    },
                    {
                        path : '/dashboard/allbuyers',
                        element : <AllBuyers></AllBuyers>
                    },
                    {
                        path : '/dashboard/reportedproducts',
                        element : <ReportedProducts></ReportedProducts>
                    },
                    {
                        path : '/dashboard/myPurchase',
                        element : <MyPurchase></MyPurchase>
                    },
                    {
                        path : '/dashboard/wishlist',
                        element : <Wishlist></Wishlist>
                    },
                ]
            }
        ]
    }
])
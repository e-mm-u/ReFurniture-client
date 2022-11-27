import { createBrowserRouter } from "react-router-dom";
import Blog from "../components/Blog/Blog";
import AllBuyers from "../components/Dashboard/admin/AllBuyers";
import AllSeller from "../components/Dashboard/admin/AllSeller";
import ReportedProducts from "../components/Dashboard/admin/ReportedProducts";
import MyBooking from "../components/Dashboard/buyer/MyBooking";
import MyPurchase from "../components/Dashboard/buyer/MyPurchase";
import Wishlist from "../components/Dashboard/buyer/Wishlist";
import AddProduct from "../components/Dashboard/seller/AddProduct";
import Mybuyers from "../components/Dashboard/seller/Mybuyers";
import MyProducts from "../components/Dashboard/seller/MyProducts";
import CategoryProduct from "../components/Home/Categories/CategoryProduct";
import Home from "../components/Home/Home";
import Payment from "../components/Payment/Payment";
import Error404 from "../components/Shared/Error404/Error404";
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
                path : '/products/category/:id',
                element : <CategoryProduct></CategoryProduct>,
                loader : ({params})=>fetch(`http://localhost:5000/products?category=${params.id}`)
                
            },
            // -------------------------- blog ----------------------------------------
            {
                path : '/blog',
                element : <Blog></Blog>
            },
            // -------------------------- PAYMENT ----------------------------------------
            {
                path : '/payment/:id',
                element : <Payment></Payment>,
                loader : ({params}) => fetch(`http://localhost:5000/products/${params.id}`)      
            },
            {
                path : '/dashboard',
                element : <DashboardLayout></DashboardLayout>,
                children : [
                    // ------------------- ADMIN ROUTES ----------------------------
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
                    // ------------------- SELLER ROUTES ----------------------------
                    {
                        path : '/dashboard/addproduct',
                        element : <AddProduct></AddProduct>
                    },
                    {
                        path : '/dashboard/myproducts',
                        element : <MyProducts></MyProducts>
                    },
                    {
                        path : '/dashboard/mybuyers',
                        element : <Mybuyers></Mybuyers>
                    },
                    // ------------------- BUYER ROUTES ----------------------------

                    {
                        path : '/dashboard/myPurchase',
                        element : <MyPurchase></MyPurchase>
                    },
                    {
                        path : '/dashboard/booking',
                        element : <MyBooking></MyBooking>
                    },
                    {
                        path : '/dashboard/wishlist',
                        element : <Wishlist></Wishlist>
                    }
                ]
            }
        ]

    },
    {
        path : "*",
        element : <Error404></Error404>
    }
])
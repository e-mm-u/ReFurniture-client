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
import AdminRoutes from "./AdminRoutes";
import BuyerRoutes from "./BuyerRoutes";
import PrivateRoutes from "./PrivateRoutes";
import SellerRoutes from "./SellerRoutes";

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
                element : <PrivateRoutes><CategoryProduct></CategoryProduct></PrivateRoutes>,
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
                element : <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes> ,
                children : [
                    // ------------------- ADMIN ROUTES ----------------------------
                    {
                        path : '/dashboard/allsellers',
                        element : <AdminRoutes><AllSeller></AllSeller></AdminRoutes>
                    },
                    {
                        path : '/dashboard/allbuyers',
                        element : <AdminRoutes><AllBuyers></AllBuyers></AdminRoutes>
                    },
                    {
                        path : '/dashboard/reportedproducts',
                        element : <AdminRoutes><ReportedProducts></ReportedProducts></AdminRoutes>
                    },
                    // ------------------- SELLER ROUTES ----------------------------
                    {
                        path : '/dashboard/addproduct',
                        element : <SellerRoutes><AddProduct></AddProduct></SellerRoutes>
                    },
                    {
                        path : '/dashboard/myproducts',
                        element : <SellerRoutes><MyProducts></MyProducts></SellerRoutes>
                    },
                    {
                        path : '/dashboard/mybuyers',
                        element : <SellerRoutes><Mybuyers></Mybuyers></SellerRoutes>
                    },
                    // ------------------- BUYER ROUTES ----------------------------

                    {
                        path : '/dashboard/myPurchase',
                        element : <BuyerRoutes><MyPurchase></MyPurchase></BuyerRoutes>
                    },
                    {
                        path : '/dashboard/booking',
                        element : <BuyerRoutes><MyBooking></MyBooking></BuyerRoutes>
                    },
                    {
                        path : '/dashboard/wishlist',
                        element : <BuyerRoutes><Wishlist></Wishlist></BuyerRoutes>
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
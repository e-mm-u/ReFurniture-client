import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContextProvider';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(null)
    const email = user?.email;
    fetch(`http://localhost:5000/users?email=${email}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setRole(data[0]?.role)
        });

    // console.log({role});

    const menuItems = role =>{
        switch (role) {
            case 'admin':
                return (<>
                <li><Link to='/dashboard/allsellers'>All sellers</Link></li>
                <li><Link to='/dashboard/allbuyers'>All buyers</Link></li>
                <li><Link to='/dashboard/reportedproducts'>Reported Products</Link></li>
            </>)
            case 'seller':
                return (<>
                <li><Link to='/dashboard/addproduct'>Add Product</Link></li>
                <li><Link to='/dashboard/myproducts'>My Products</Link></li>
                <li><Link to='/dashboard/mybuyers'>My Buyers</Link></li>
            </>)
            case 'buyer':
                return (<>
                <li><Link to='/dashboard/myPurchase'>My Purchase</Link></li>
                <li><Link to='/dashboard/wishlist'>My Wishlist</Link></li> 
            </>)
            default:
                return null
        }
    }
        // role === 'admin' &&
        // <>
        //     <li><Link to='/allsellers'>All sellers</Link></li>
        //     <li><Link to='/allbuyers'>All buyers</Link></li>
        //     <li><Link to='/reportedproducts'>Reported Products</Link></li>
        // </>
        // role === 'seller' &&
        // <>
        //     <li><Link to='/addproduct'>Add Product</Link></li>
        //     <li><Link to='/myproducts'>My Products</Link></li>
        //     <li><Link to='/mybuyers'>My Buyers</Link></li>
        // </>
        // role === 'buyer' &&
        // <>
        //     <li><Link to='/allorders'>My orders</Link></li>
        //     <li><Link to='/mywishlist'>My Wishlist</Link></li> 
        // </>
    return (
        <div>
            <h1 className="text-2xl text-center font-bold">D a s h  b o a r d </h1>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className="w-full navbar">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg> */}
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">Hello, {user?.displayName}</div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                {menuItems(role)}
                            </ul>
                        </div>
                    </div>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100">
                        {menuItems(role)}
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
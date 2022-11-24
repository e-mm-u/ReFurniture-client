import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const menuItems = <>
        <li><Link to='/allsellers'>All sellers</Link></li>
        <li><Link to='/allbuyers'>All buyers</Link></li>
    </>

    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <div className="w-full navbar">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2">Hello, {user?.displayName}</div>
                    <div className="flex-none hidden lg:block">
                        <ul className="menu menu-horizontal">
                            {menuItems}
                        </ul>
                    </div>
                </div>
                Content
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100">
                    {menuItems}
                </ul>

            </div>
        </div>
    );
};

export default AdminDashboard;
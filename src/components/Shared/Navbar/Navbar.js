import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';
import Loading from '../Loading/Loading';

const Navbar = () => {
    const { user, isloading, logOut } = useContext(AuthContext);

    if(isloading) {
        return <Loading></Loading>
    }
    // console.log('user in navbar', user);
    const handleLogOut = () =>{
        logOut()
            .then(()=>toast('logged out'))
            .catch(err => console.error('error while logging out'))
    }

    const menuItems = <>
            <li><Link> Blog </Link></li>
            <li><Link> Products </Link></li>
        {!user &&
            <>
                <li><Link to='/login'> Login </Link></li>
            </>
        }
        {user &&
            <>
                <li><Link to='/dashboard'> Dashboard </Link></li>
                <li><Link> Wishlist </Link></li>
                <li><Link>Hi, {user?.displayName} </Link></li>
                <li><button onClick={()=>handleLogOut()}>Logout </button> </li>
            </>
        }
    </>
    return (
        <div className='navbar flex justify-between md:justify-around'>
            <div className="navbar">
                <Link to='/' className="btn btn-ghost normal-case text-xl"> Recycle Furniture</Link>
            </div>
            <div className="navbar">
                <ul className="flex gap-5 hidden md:flex">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end dropdown">
                <label tabIndex={0} className="btn btn-ghost md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
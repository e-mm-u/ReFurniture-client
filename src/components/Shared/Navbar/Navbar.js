import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';
import Loading from '../Loading/Loading';

const Navbar = () => {
    const { user, loading, logOut } = useContext(AuthContext);

    if(loading) {
        return <Loading></Loading>
    }
    // console.log('user in navbar', user);
    const handleLogOut = () =>{
        logOut()
            .then(()=>toast('logged out'))
            .catch(err => console.error('error while logging out'))
    }

    const menuItems = <>
            <li className='text-navy-600 hover:text-red-700 hover:font-semibold'><Link> Blog </Link></li>
        {!user &&
            <>
                <li className='text-navy-600 hover:text-red-700 hover:font-semibold'><Link to='/login'> Login </Link></li>
            </>
        }
        {user &&
            <>
                <li className='text-navy-600 hover:text-red-700 hover:font-semibold'><Link to='/dashboard'> Dashboard </Link></li>
                <li className='text-navy-600 hover:text-red-700 hover:font-semibold'><Link>Hi, {user?.displayName} </Link></li>
                <li className='text-navy-600 hover:text-red-700 hover:font-semibold'><button onClick={()=>handleLogOut()}>Logout </button> </li>
            </>
        }
    </>
    return (
        <div className='navbar flex justify-between'>
            <div className="navbar">
                <Link to='/' className="font-bold normal-case text-3xl"> <span className='text-red-700'> Re</span><span className='text-navy-800'>Furniture </span> </Link>
            </div>
            <div className="dropdown md:hidden">
                <label tabIndex={0} className="btn btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow rounded-box w-52">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar flex justify-end mr-5">
                <ul className="flex gap-5 hidden md:flex">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
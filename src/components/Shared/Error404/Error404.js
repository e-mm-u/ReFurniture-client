import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../images/err.webp'

const Error404 = () => {
    return (
        <div className='flex flex-col justify-center items-center h-[100vh]'>
            <img src={img} alt="404" />
            <Link to='/'>
                <div className='btn btn-xl bg-rose-500 hover:bg-rose-700'>Go To Home</div>
            </Link>
        </div>
    );
};

export default Error404;
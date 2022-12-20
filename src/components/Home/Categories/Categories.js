import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = ["bed_room", "drawing_room", "kids_room", "dining_kitchen", "others"]
    return (
        <div className='mt-10'>
            <div className='my-5'>
                <h1 className="font-bold sm:text-xl text-cyan-900 text-center uppercase">choose product category</h1>
            </div>
            <div className='flex flex-wrap justify-center align-center gap-5'>
                <Link to={`/products/category/${categories[0]}`}>
                    <div className='btn btn-lg bg-white text-cyan-700 hover:bg-blue-500 hover:text-white w-80 sm:w-96'>
                        BED ROOM
                    </div>
                </Link>
                <Link to={`/products/category/${categories[1]}`}>
                    <div className='btn btn-lg bg-white text-cyan-700 hover:bg-blue-500 hover:text-white w-80 sm:w-96'>
                        DRAWING ROOM
                    </div>
                </Link>
                <Link to={`/products/category/${categories[2]}`}>
                    <div className='btn btn-lg bg-white text-cyan-700 hover:bg-blue-500 hover:text-white w-80 sm:w-96'>
                        KID'S SPECIAL
                    </div>
                </Link>
                <Link to={`/products/category/${categories[3]}`}>
                    <div className='btn btn-lg bg-white text-cyan-700 hover:bg-blue-500 hover:text-white w-80 sm:w-96'>
                        DINING & KITCHEN
                    </div>
                </Link>
                <Link to={`/products/category/${categories[4]}`}>
                    <div className='btn btn-lg bg-white text-cyan-700 hover:bg-blue-500 hover:text-white w-80 sm:w-96'>
                        OTHERS
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Categories;
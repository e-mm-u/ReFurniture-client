import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = ["bed_room", "drawing_room", "kids_room", "dining_kitchen", "others"]
    return (
        <div className='border border-navy-600 border-5 mt-10'>
            <div className='my-5'>
                <h1 className="font-bold sm:text-xl divider uppercase">choose product category</h1>
            </div>
            <div className='flex flex-wrap justify-center align-center gap-5'>
                <Link to={`/products/category/${categories[0]}`}>
                    <div className='btn btn-lg bg-red-400 hover:bg-blue-900 w-80 sm:w-96'>
                        BED ROOM
                    </div>
                </Link>
                <Link to={`/products/category/${categories[1]}`}>
                    <div className='btn btn-lg bg-red-400 hover:bg-blue-900 w-80 sm:w-96'>
                        DRAWING ROOM
                    </div>
                </Link>
                <Link to={`/products/category/${categories[2]}`}>
                    <div className='btn btn-lg bg-red-400 hover:bg-blue-900 w-80 sm:w-96'>
                        KID'S SPECIAL
                    </div>
                </Link>
                <Link to={`/products/category/${categories[3]}`}>
                    <div className='btn btn-lg bg-red-400 hover:bg-blue-900 w-80 sm:w-96'>
                        DINING & KITCHEN
                    </div>
                </Link>
                <Link to={`/products/category/${categories[4]}`}>
                    <div className='btn btn-lg bg-red-400 hover:bg-blue-900 w-80 sm:w-96'>
                        OTHERS
                    </div>
                </Link>

            </div>
            <div>
                <span className='divider my-5 p-5'></span>
            </div>
        </div>
    );
};

export default Categories;
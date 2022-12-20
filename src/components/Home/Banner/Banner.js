import React from 'react';
import img from '../../images/banner_m1.webp'

const Banner = () => {
    return (
        // <div className="hero h-[50vh]" style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}>
        <div className={`hero h-[50vh]`} style={{ backgroundImage: `url(${img})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5  text-xl sm:text-2xl  md:text-3xl  lg:text-5xl font-bold">Re Furniture</h1>
                    <p className="mb-5 text-xs sm:text-sm md:text-lg"> Makes Furniture Affordable to you </p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
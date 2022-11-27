import React from 'react';

const Banner = () => {
    return (
        <div className="hero h-[50vh]" style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5  text-xl sm:text-2xl  md:text-3xl  lg:text-5xl font-bold">Hello there</h1>
                    <p className="mb-5 text-xs sm:text-sm md:text-lg">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
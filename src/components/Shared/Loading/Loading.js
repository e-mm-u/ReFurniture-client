import React from 'react';

const Loading = () => {
    return (
        <div className='h-[50vh] flex justify-center items-center'>
            <div className="spinner-grow inline-block 
            w-8 h-8 rounded-full 
            opacity-0 text-purple-500"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;
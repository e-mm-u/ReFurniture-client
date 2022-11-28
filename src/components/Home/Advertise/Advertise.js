import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';

const Advertise = () => {

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`https://server-two-mu.vercel.app/products/advertise`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <>
            {
                !products.length ?
                    <> </> :
                    <div>
                        <h1 className="text-center text-xl my-5 font-semibold">Check ads if it matches your need</h1>
                        <div className='flex justify-center items-center gap-5 flex-wrap my-12'>
                            {
                                products?.map(product =>
                                    <div key={product._id} className=''>
                                        <div className="card card-compact w-full w-96 h-96 shadow-xl">
                                            <img src={product.image} alt="Shoes" className='h-1/2 w-full' />
                                            <div className="card-body">
                                                <div className='flex justify-between items-center'>
                                                    <h2 className="card-title">
                                                        {product.product_name}
                                                    </h2>
                                                    <div className="card-actions justify-end">
                                                        <div className="badge badge-outline bg-purple-300">{product.condition}</div>
                                                        <div className="badge badge-outline bg-pink-200">{product.used}</div>
                                                    </div>
                                                </div>
                                                <p>{product.desc}</p>
                                                <div className="card-actions justify-center">
                                                    {/* <div className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-pink-400">book</div> */}
                                                    {/* <div className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-pink-400">add to wishlist</div> */}
                                                    {/* <div className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-red-400">report</div> */}
                                                    <Link to='/products/category/bed_room' className="uppercase btn btn-sm hover:bg-blue-400 text-black bg-blue-200"> details </Link>
                                                </div>
                                            </div>
                                            <div className='card-footer p-2 flex justify-between'>
                                                <small>Posted : {product.posted_on}</small>
                                                <div className='flex gap-1 items-center justify-center'>
                                                    <small>Seller : {product.seller[0].name}</small>
                                                    {product.seller[0].verified &&
                                                        <small className="badge badge-outline bg-green-400">v</small>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>

            }
        </>
    );
};

export default Advertise;
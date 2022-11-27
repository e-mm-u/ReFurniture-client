import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading/Loading';

const Advertise = () => {

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/advertise`);
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
                        <h1 className="h1ider">Check ads if it matches your need</h1>
                        <div className='flex justify-center items-center gap-5 flex-wrap'>
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
                                                    <div className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-pink-400">book</div>
                                                    <div className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-pink-400">add to wishlist</div>
                                                    <div className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-red-400">report</div>
                                                    <div className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-blue-200"> details </div>
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
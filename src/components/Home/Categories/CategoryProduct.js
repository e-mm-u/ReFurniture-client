import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';
import BookingModal from '../../Shared/Modal/BookingModal';

const CategoryProduct = () => {
    const {user} = useContext(AuthContext);
    const products = useLoaderData();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    // add product to users wishlist
    const handleWishlist = product => {
       
        fetch(`https://server-two-mu.vercel.app/users?email=${user?.email}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({product_id : product._id, wishlist : true })
        })
        .then(res => res.json() )
        .then(data =>{
            if(data.acknowledged){
                toast.success('Product kept in wishlist successfully');
                navigate('/dashboard/wishlist');
            }
            console.log(data);
        })

    }

    // report a product
    const handleReport = product => {

        fetch(`https://server-two-mu.vercel.app/products/${product._id}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({ reported : true })
        })
        .then(res => res.json() )
        .then(data =>{
            if(data.acknowledged){
                toast.success('Product reported to admin');
            }
            console.log(data);
        })

    }

    return (
        <div className='my-10'>
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
                                        {/*  book is modal triggure button */}
                                        <label
                                            htmlFor='booking-modal'
                                            onClick={() => { setProduct(product) }}
                                            className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-yellow-300"
                                        >
                                            book
                                        </label>

                                        <div 
                                            onClick={()=>handleWishlist(product)}
                                            className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-pink-400"
                                            >
                                            add to wishlist
                                        </div>
                                        <div 
                                            onClick={()=>handleReport(product)}
                                            className="uppercase btn btn-xs hover:bg-blue-400 text-black bg-red-400"
                                            >
                                                report
                                        </div>
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
            {
                product && <BookingModal
                    product ={product}                
                ></BookingModal>
            }
        </div>
    );
};

export default CategoryProduct;
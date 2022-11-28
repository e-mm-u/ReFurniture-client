import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';

const MyBooking = () => {
    const {user} = useContext(AuthContext);

    //  here we get the users products_id array from booking list
    const {data : booking_products = null} = useQuery({
        queryKey : ['booking_products'],
        queryFn : async ()=>{
            const res = await fetch(`http://localhost:5000/buyer/products/booking?email=${user?.email}`,{
                headers : {
                    authorization : `bearer ${localStorage.getItem('access_token')}`
                }                
            });
            const data = await res.json();

            return data ;
        }
    })
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th> 
                        <th>Product</th> 
                        <th>Seller Details</th> 
                        <th>Buying Price &  <br /> Selling Price</th>
                        <th> Status & Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        booking_products?.map((product,i)=>
                            <tr key={i}>
                                <th>{i+1}</th>

                                {/* products name, image and location */}
                                <td className=''>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={product.image} alt={product.product_name} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold">{product.product_name}</p>
                                            <p className="text-sm opacity-50">{product.location}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* seller information - name, email, phone */}
                                <td className='gap-2'>
                                    <p>{product?.seller[0]?.name}</p>
                                    <p>{product?.seller[0]?.email}</p>
                                    <p>{product?.seller_phone}</p>
                                </td>

                                {/* price */}
                                <td className=''>
                                    <p>{product?.price_buy}</p>
                                    <p>{product?.price_sale}</p>
                                </td>

                                <td className='flex gap-3 items-center'>
                                { 
                                    (product.paid && (product.buyer.email === user.email)) && 
                                    <>
                                    <div className="badge badge-outline bg-yellow-400">It's YOURS</div>
                                    <div className="badge badge-outline bg-green-600">Paid</div>
                                    </>
                                }
                                { 
                                    (product.paid && (product.buyer.email !== user.email)) && 
                                    <>
                                    <div className="badge badge-outline bg-red-300">Already sold</div>
                                    <div className='btn btn-sm btn-outline bg-green-500 hover:bg-orange-500 text-white disabled'>Pay</div>
                                    </>
                                }
                                { 
                                    !product.paid  && 
                                    <>
                                    <div className="badge badge-outline bg-yellow-400">Available</div>
                                    <Link 
                                        to={`/payment/${product._id}`}
                                        className='btn btn-sm btn-outline bg-green-500 hover:bg-orange-500 text-white'
                                    >
                                        Pay now
                                    </Link>
                                    </>
                                }
                                    <button className='btn btn-sm btn-outline bg-red-300 hover:bg-red-500 text-white'>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyBooking;
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContextProvider';

const MyBooking = () => {
    const {user} = useContext(AuthContext);

    //  here we get the users products_id array from booking list
    const {data : booking_products = null} = useQuery({
        queryKey : ['booking_products'],
        queryFn : async ()=>{
            const res = await fetch(`http://localhost:5000/products/booking?email=${user?.email}`);
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
                        <th>Payment status</th> 
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

                                <td>
                                    <button className='btn btn-sm btn-outline bg-green-500 hover:bg-orange-500 text-white'>pay now</button>
                                    <button className='btn btn-sm btn-outline bg-red-300 hover:bg-red-500 text-white'>delete</button>
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
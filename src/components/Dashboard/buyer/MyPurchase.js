import { useQuery } from '@tanstack/react-query';
import React, { useContext} from 'react';
import { AuthContext } from '../../../Context/AuthContextProvider';

const MyPurchase = () => {
    const {user} = useContext(AuthContext);

    const {data : purchased_products = null} = useQuery({
        queryKey : ['purchased_products'],
        queryFn : async ()=>{
            const res = await fetch(`https://server-two-mu.vercel.app/products/purchasedby?email=${user?.email}`);
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
                        <th>Price &  <br /> Transaction ID</th> 
                        <th>Action</th> 
                    </tr>
                </thead>

                <tbody>
                    {
                        purchased_products?.map((purchase,i)=>
                            <tr key={i}>
                                <th>{i+1}</th>

                                {/* products name, image and location */}
                                <td className=''>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={purchase.image} alt={purchase.product_name} />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="font-bold">{purchase.product_name}</p>
                                            <p className="text-sm opacity-50">{purchase.location}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* seller information - name, email, phone */}
                                <td className='gap-2'>
                                    <p>{purchase?.seller[0]?.name}</p>
                                    <p>{purchase?.seller[0]?.email}</p>
                                    <p>{purchase?.seller_phone}</p>
                                </td>

                                {/* price */}
                                <td className=''>
                                    <p>{purchase?.price_sale}</p>
                                    <p>{purchase?.transaction_id ? purchase.transaction_id : null}</p>
                                </td>

                                <td><button>delete</button></td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyPurchase;
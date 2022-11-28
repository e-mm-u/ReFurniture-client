import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContextProvider';
import Loading from '../../Shared/Loading/Loading';

const MyProducts = () => {
    const {user, loading} = useContext(AuthContext);

    const {data : products = [], isLoading, refetch} = useQuery({
        queryKey : ['products'],
        queryFn : async () =>{
            try{
                const res = await fetch(`https://server-two-mu.vercel.app/seller/products?email=${user?.email}`,
                    {
                        headers : {
                            authorization : `bearer ${localStorage.getItem('access_token')}`
                        }

                    }
                );
                const data = await res.json();
                return data;
            }catch(err){
                console.error(err);
            }
        }
    });

    const handleAdvertise = product => {
        const { _id, product_name } = product;

        let confirmation = null;
        if(window.confirm(`Do you really want to advertise this product : ${product_name}`)){
            confirmation = true;
        }else{
            confirmation = false;
        }
        if(confirmation){

            fetch(`https://server-two-mu.vercel.app/seller/products/${_id}`, {
                method : 'PUT',
                headers : {
                    authorization : `bearer ${localStorage.getItem('access_token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.acknowledged){
                        toast.success(`product:${product_name}  \nAdvertised successfully`);
                        refetch();
                    }
                })
        }
    }

    const handleDelete = product => {
        const { _id, product_name } = product;

        let confirmation = null;
        if(window.confirm(`Do you really want to delete product : ${product_name}`)){
            confirmation = true;
        }else{
            confirmation = false;
        }
        if(confirmation){

            fetch(`https://server-two-mu.vercel.app/seller/products/${_id}`, {
                method : 'DELETE',
                headers : {
                    authorization : `bearer ${localStorage.getItem('access_token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount === 1){
                        toast.success(`product:${product_name}  \nDeleted successfully`);
                        refetch();
                    }
                })
        }
    }


    if(isLoading || loading){
        return <Loading></Loading>
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th> 
                        <th>Product</th> 
                        <th>Buying Price & <br /> Selling Price</th> 
                        <th>Status</th> 
                        <th>Action</th> 
                    </tr>
                </thead>

                <tbody>
                    {
                        products?.map((product,i)=>
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

                                {/* price */}
                                <td className=''>
                                    <p>{product?.price_buy}</p>
                                    <p>{product?.price_sale}</p>
                                </td>

                                {/* status */}
                                <td>
                                    { product.paid ? 
                                        <p className='text-green-500'>Sold :) </p> 
                                        : 
                                        <div className='flex gap-2 items-center'>
                                            <p className='text-red-500'> Not sold yet </p>
                                            <button onClick={()=>handleAdvertise(product)}
                                                className="btn btn-outline btn-xs"
                                            >Advertise</button>
                                        </div> 
                                    }
                                </td>

                                <td>
                                    <button onClick={()=>handleDelete(product)}>Delete</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyProducts;
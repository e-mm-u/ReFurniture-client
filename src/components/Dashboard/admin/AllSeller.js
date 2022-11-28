import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContextProvider';
import Loading from '../../Shared/Loading/Loading';

const AllSeller = () => {
    const {user, loading} = useContext(AuthContext);

    const {data : sellers = [], isLoading, refetch} = useQuery({
        queryKey : ['sellers'],
        queryFn : async () =>{
            try{
                // const res = await fetch(`http://localhost:5000/users?role=seller`);
                console.log(user?.email);
                const res = await fetch(`http://localhost:5000/admin/users/sellers?email=${user?.email}`,
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
    })

    const handleDelete = seller => {
        const {name, _id} = seller;
        console.log({_id});

        let confirmation = null;
        if(window.confirm(`Do you really want to delete seller : ${name}`)){
            confirmation = true;
        }else{
            confirmation = false;
        }
        if(confirmation){

            fetch(`http://localhost:5000/admin/users/sellers/${_id}`, {
                method : 'DELETE',
                headers : {
                    authorization : `bearer ${localStorage.getItem('access_token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount === 1){
                        toast.success(`seller :${name}  \nDeleted successfully`);
                        refetch();
                    }
                })
        }

    }

    // ----------------------------- v e r i f y  ----------------------------------------
    const handleVerify = seller => {
        const {name, _id} = seller;
        console.log({_id});

        let confirmation = null;
        if(window.confirm(`Do you really want to verify seller : ${name}`)){
            confirmation = true;
        }else{
            confirmation = false;
        }
        if(confirmation){

            fetch(`http://localhost:5000/admin/users/sellers/${_id}`, {
                method : 'PUT',
                headers : {
                    authorization : `bearer ${localStorage.getItem('access_token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if(data.modifiedCount > 0){
                        toast.success(`seller :${name}  \n Verified successfully`);
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
            <table className="table table-compact table-zebra w-full">
                <thead>
                    <tr>
                        <th></th> 
                        <th>Name</th> 
                        <th>Email</th> 
                        <th>Status</th> 
                        <th>Action</th> 
                    </tr>
                </thead>

                <tbody>
                    {
                        sellers?.map((seller,i)=>
                            <tr key={seller._id}>
                                <th>{i+1}</th>
                                <td>{seller?.name}</td>
                                <td>{seller?.email}</td>
                                <td>
                                    {
                                    seller?.verified ? 
                                        <button className='btn btn-outline bg-green-500 btn-xs'>Verified</button> 
                                        : 
                                        <button onClick={()=>handleVerify(seller)} className='btn btn-outline btn-xs'>Verify</button>
                                    }
                                </td>
                                <td className='flex gap-2'>
                                    <button onClick={()=>handleDelete(seller)} className='btn btn-outline btn-xs'>Delete</button>
                                    <button className='btn btn-outline btn-xs'>Make admin</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllSeller;
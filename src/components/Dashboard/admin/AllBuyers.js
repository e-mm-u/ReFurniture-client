import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContextProvider';
import Loading from '../../Shared/Loading/Loading';

const AllBuyers = () => {
    const {user, loading} = useContext(AuthContext);

    const {data : buyers = [], isLoading, refetch} = useQuery({
        queryKey : ['buyers'],
        queryFn : async () =>{
            try{
                const res = await fetch(`http://localhost:5000/admin/users/buyers?email=${user?.email}`,
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

    // const {data : buyers = [], isLoading, refetch} = useQuery({
    //     queryKey : ['buyers'],
    //     queryFn : async () =>{
    //         try{
    //             const res = await fetch(`http://localhost:5000/users?role=buyer`);
    //             const data = await res.json();
    //             return data;
    //         }catch(err){
    //             console.error(err);
    //         }
    //     }
    // })

    const handleDelete = buyer => {
        const {name, role, _id} = buyer;
        console.log({_id});

        let confirmation = null;
        if(window.confirm(`Do you really want to delete ${role} : ${name}`)){
            confirmation = true;
        }else{
            confirmation = false;
        }
        if(confirmation){

            fetch(`http://localhost:5000/users/${_id}`, {
                method : 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if(data.deletedCount === 1){
                        toast.success(`${role}:${name}  \nDeleted successfully`);
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
                        <th>Action</th> 
                    </tr>
                </thead>

                <tbody>
                    {
                        buyers?.map((buyer,i)=>
                            <tr key={buyer._id}>
                                <th>{i+1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
                                <td className='flex gap-2'>
                                    <button onClick={()=>handleDelete(buyer)} className='btn btn-outline btn-xs'>Delete</button>
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

export default AllBuyers;
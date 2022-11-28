import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContextProvider';
import Loading from '../../Shared/Loading/Loading';

const AllSeller = () => {
    const {user, loading} = useContext(AuthContext);

    // const [sellers, setSellers] = useState([]);
    // const [verified, setVerified] = useState(false);
    
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/users?role=seller`)
    //     .then(res => res.json())
    //     .then(data => {
    //         // console.log(data);
    //         setSellers(data);
    //     });
    // },[]);
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

    if(loading){
        return <Loading></Loading>
    }

    const handleDelete = seller => {
        const {name, role, _id} = seller;
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
    if(isLoading){
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
                                        <button className='btn btn-outline btn-xs'>Verified</button> 
                                        : 
                                        <button className='btn btn-outline btn-xs'>Verify</button>
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
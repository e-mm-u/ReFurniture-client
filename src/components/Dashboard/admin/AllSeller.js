import React, { useEffect, useState } from 'react';

const AllSeller = () => {
    const [sellers, setSellers] = useState([]);
    
    useEffect(()=>{
        fetch(`http://localhost:5000/users?role=seller`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setSellers(data);
        });
    },[])
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
                        sellers?.map((seller,i)=>
                            <tr key={seller._id}>
                                <th>{i+1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td className='flex gap-2'>
                                    <button>Delete</button>
                                    <button>Make admin</button>
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
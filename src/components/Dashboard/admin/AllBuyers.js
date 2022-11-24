import React, { useEffect, useState } from 'react';

const AllBuyers = () => {
    const [buyers, setbuyers] = useState([]);
    
    useEffect(()=>{
        fetch(`http://localhost:5000/users?role=buyer`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setbuyers(data);
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
                        buyers?.map((buyer,i)=>
                            <tr key={buyer._id}>
                                <th>{i+1}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.email}</td>
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

export default AllBuyers;
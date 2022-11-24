import React from 'react';

const MyPurchase = () => {
    const myPurchase = [1,2,3]
    return (
        <div className="overflow-x-auto">
            <table className="table table-compact table-zebra w-full">
                <thead>
                    <tr>
                        <th></th> 
                        <th>Product</th> 
                        <th>Price & Date</th> 
                        <th>Seller Details</th> 
                        <th>Action</th> 
                    </tr>
                </thead>

                <tbody>
                    {
                        myPurchase?.map((purchase,i)=>
                            <tr key={i}>
                                <th>{i+1}</th>

                                <td className='gap-2'>
                                    <p>thumbnail</p>
                                    <p>title</p>
                                </td>

                                <td className='gap-2'>
                                    <p>Price</p>
                                    <p>Date</p>
                                </td>

                                <td className='gap-2'>
                                    <p>Seller name</p>
                                    <p>seller phone</p>
                                    <p>seller email</p>
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
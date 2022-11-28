import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';

const BookingModal = ({ product }) => {
    const { user } = useContext(AuthContext);
    const { product_name, price_sale, price_buy, _id } = product;

    const {register, handleSubmit, reset} = useForm();
    const navigate = useNavigate()

    const handleBooking = data => {
        reset();
       
        fetch(`http://localhost:5000/users?email=${user?.email}`, {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({product_id : _id, booking : true })
        })
        .then(res => res.json() )
        .then(data =>{
            if(data.acknowledged){
                toast.success('Product booked successfully');
                navigate('/dashboard/booking');
            }
            console.log(data);
        })

    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className='modal-toggle' />
            <div className="modal">
                <div className="modal-box relative w-[80vw]">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleSubmit(handleBooking)}>

                        <div className="form-control my-2">
                            <label className='flex flex-col gap-1 text-center'>
                                <span className='font-semibold text-xl'>Product </span>
                                <input type="text" value={product_name} className="input input-bordered text-center" disabled />
                            </label>
                        </div>

                        <div className="form-control flex flex-row w-full gap-4 my-2">
                            <label className="flex flex-col w-1/2 text-center gap-1">
                                <span>Buying price</span>
                                <input type="text" value={price_buy} className="input input-bordered text-center" disabled />
                            </label>
                            <label className="flex flex-col w-1/2 text-center gap-1">
                                <span>Selling price</span>
                                <input type="text" value={price_sale} className="input input-bordered text-center" disabled />
                            </label>
                        </div>

                        <div>
                            <div className="text-xl font-semibold text-center">Buyer</div>
                            <div className="form-control flex flex-row w-full gap-4 my-2">
                                <label className="flex flex-col w-1/2 text-center gap-1">
                                    <span>Name</span>
                                    <input type="text" value={user?.displayName} className="input input-bordered" disabled />
                                </label>
                                <label className="flex flex-col w-1/2 text-center gap-1">
                                    <span>Email</span>
                                    <input type="text" value={user?.email} className="input input-bordered" disabled />
                                </label>
                            </div>
                            {/* USER INPUT  */}
                            <div className="form-control flex flex-row w-full gap-4 my-2">
                                <label className="flex flex-col w-1/2 text-center gap-1">
                                    <span className='font-semibold'>Phone</span>
                                    <input 
                                        {...register("phone", {
                                            required: "required to book a product",
                                        })}
                                        type="text" 
                                        placeholder='ex : 01XXXXXXXX' 
                                        className="input input-bordered"
                                        required
                                    />
                                </label>

                                <label className="flex flex-col w-1/2 text-center gap-1">
                                    <span className='font-semibold'>Location</span>
                                    <input 
                                        {...register("location", {
                                            required: "required to book a product",
                                        })}
                                        type="text" 
                                        placeholder='ex : Dhaka' 
                                        className="input input-bordered"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className='flex justify-center my-2'>
                            <input type="submit" value="Book now" className='uppercase w-lg btn btn-outline bg-purple-500 text-white hover:bg-orange-500'/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
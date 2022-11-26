import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContextProvider';

const BookingModal = ({ product }) => {
    const { user } = useContext(AuthContext);
    const { product_name, price_sale, price_buy } = product;
    return (
        <div>
            <input type="checkbox" id="booking-modal" className='modal-toggle' />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">product : {product_name}</h3>
                    <span>{price_buy} {price_sale}</span>
                    <p> buyer : {user?.displayName}</p>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;
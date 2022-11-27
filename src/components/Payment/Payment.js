import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);

const Payment = () => {
    console.log(stripePromise)

    const product = useLoaderData();

    return (
        <div>
            <h1 className="text-xl text-center font-bold">Please proceed payment to buy {product.product_name}</h1>
            <div className='flex justify-center items-center w-96'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm product={product} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;
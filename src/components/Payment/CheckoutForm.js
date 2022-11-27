import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { AuthContext } from '../../Context/AuthContextProvider';
import { useForm } from 'react-hook-form';



const CheckoutForm = ({ product }) => {
    const { user } = useContext(AuthContext);
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();

    const { register, handleSubmit } = useForm();
    const { price_sale, _id } = product;

    useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price: price_sale })
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret);
            })
    }, [price_sale])

    const handlePayment = async (data) => {

        const {phone, location} = data ;

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName,
                        email: user?.email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            // info need to update product payment status
            const payment = {
                name : user?.displayName,
                email : user?.email,
                phone,
                location,
                transactionId: paymentIntent.id,
            }
            fetch(`http://localhost:5000/products/payment/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    // if (data.updatedCoun ) {
                    //     setSuccess('Congrats! your payment completed');
                    //     setTransactionId(paymentIntent.id);
                    // }
                })
        }
        setProcessing(false);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handlePayment)}>

                <div className="form-control">
                    <label>Confirm Your Phone *</label>
                    <input 
                        {...register("phone", {
                            required: "Phone is must to confirm purchase",
                        })}
                        type="text"
                        required
                    />
                </div>
                <div className="form-control">
                    <label>Confirm Your Location *</label>
                    <input 
                        {...register("location", {
                            required: "Location is must to confirm purchase",
                        })}
                        type="text"
                        required
                    />
                </div>

                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className='btn btn-sm mt-4 btn-primary'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            <p className="text-red-500">{cardError}</p>
            {
                success && <div>
                    <p className='text-green-500'>{success}</p>
                    <p>Your transactionId: <span className='font-bold'>{transactionId}</span></p>
                </div>
            }
        </div>
    );
};

export default CheckoutForm;
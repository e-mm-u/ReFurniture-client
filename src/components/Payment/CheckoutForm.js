import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContextProvider';

const CheckoutForm = ({product}) => {
    const {user} = useContext(AuthContext);
    const {email, displayName : name} = user;
    const navigate = useNavigate();

    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");

    const stripe = useStripe();
    const elements = useElements();
    const { price_sale, _id } = product;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://server-two-mu.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization : `bearer ${localStorage.getItem('access_token')}`
            },
            body: JSON.stringify({ price : price_sale }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price_sale]);

    const handleSubmit = async (event) => {
        event.preventDefault();

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
                        name: name,
                        email: email
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
            // store payment info in the database
            const buyer = {
                transactionId: paymentIntent.id,
                email,
                name,
            }
            fetch(`https://server-two-mu.vercel.app/products/payment/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization : `bearer ${localStorage.getItem('access_token')}`
                },
                body: JSON.stringify(buyer)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.modifiedCount) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                        navigate('/dashboard/booking');
                    }
                })
        }
        setProcessing(false);


    }

    return (
        <>
            <form onSubmit={handleSubmit} className='w-96 p-5 my-10 flex flex-col justify-center gap-5'>
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
        </>
    );
};

export default CheckoutForm;
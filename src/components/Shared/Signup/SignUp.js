import React, { useContext, useState} from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';
import useToken from '../../../hooks/useToken';


const SignUp = () => {
    const { register, handleSubmit } = useForm();
    const { createUser, updateUser, googleLogin} = useContext(AuthContext);
    // const [registerError, setRegisterError] = useState('')

    const [userEmail, setUserEmail] = useState('');
    const { token } = useToken(userEmail);

    const navigate = useNavigate();

    if(token){
        navigate('/')
    }

    const handleSignUp = data => {
        // console.log('signup form data ',data);
        const {name, email, password, role} = data;
        // console.log(name, email, password, role)
        createUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success('user created')

                const userInfo = {
                    displayName : name
                }
                updateUser(userInfo)
                    .then(()=>{
                        // console.log('user Updated');
                        toast.success('user updated');
                        saveUser(name, email, role);
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }
    const handleGoogleLogin = () =>{
        googleLogin()
            .then(result=>{
                const user = result.user;
                const role = 'buyer';
                // console.log('google login ', user);
                saveUser(user.displayName, user.email, role);
            })
            .catch(err => console.error(err))
    }

    const saveUser = (name, email, role) => {
        const verified = false ;
        const wishlist = [ ];
        const booking = [ ];
        
        let user = null;

        if(role === 'seller'){
            user = {name, email, role, verified};
        }
        if(role === 'buyer'){
            user = {name, email, role, wishlist, booking};
        }
        
        fetch('https://server-two-mu.vercel.app/users', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            // console.log('data got in saved user ',data);
            //  we are here means user is saved in db
            //  now time to request for the jwt token
            setUserEmail(email); // it will use useToken hook to get jwt token
        })
    }

    return (
        <>
            <h1 className="text-xl font-bold text-center">SignUp </h1>
            <div className="flex flex-col w-full max-w-sm mx-auto p-4">
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input {...register('name')} type="text" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register('email')} type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register('password')} type="password" placeholder="password" className="input input-bordered" required />
                        <label className="label">
                            <a href=" " className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <p className='inline-block'>Register as :</p>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input form-check-input rounded-full h-4 w-4 mr-2 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top  cursor-pointer"
                                type="radio"
                                value="buyer"
                                {...register('role')}
                                checked
                            />
                            <label className="form-check-label inline-block text-gray-800" >Buyer</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input form-check-input rounded-full h-4 w-4 mr-2 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top  cursor-pointer"
                                type="radio"
                                value="seller"
                                {...register('role')}
                            />
                            <label className="form-check-label inline-block text-gray-800" >Seller</label>
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Sign Up</button>
                    </div>
                    <div className='text-blue-500 mt-2'>
                        <Link to='/login'>Already have an account?</Link>
                    </div>

                </form>
                <div className="form-control mt-6">
                    <p className='divider'>OR</p>
                    <button onClick={()=>handleGoogleLogin()} type='submit' className="btn btn-warning">Sign in with Google</button>
                </div>
            </div>
        </>
    );
};

export default SignUp;
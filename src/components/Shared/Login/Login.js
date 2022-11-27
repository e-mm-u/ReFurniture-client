import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthContextProvider';
import useToken from '../../../hooks/useToken';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const {login, googleLogin} = useContext(AuthContext);

    const [userEmail, setUserEmail] = useState('');
    const {token} = useToken(userEmail);

    const navigate = useNavigate();

    if(token){
        navigate('/');
    }
    
    
    const handleLogin = data => {
        // console.log('clicked')
        // console.log(data);

        const {email, password} = data;

        login(email, password)
            .then((result)=>{
                const user = result.user;
                setUserEmail(email);
                // console.log('email pass login user', user)
            })
            .catch(err=>console.error(err))

    }
    const handleGoogleLogin = () => {
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
        
        fetch('http://localhost:5000/users', {
            method : 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            // console.log('data got in saved user ',data);
            setUserEmail(email);
        })
    }
    return (
        <>
            <h1 className="text-xl font-bold text-center">Login </h1>
            <div className="flex flex-col w-full max-w-sm mx-auto p-4">
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input {...register('email')} type="email" placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input {...register('password')} type="password" placeholder="password" className="input input-bordered" />
                        <label className="label">
                            <a href=" " className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button type='submit' className="btn btn-primary">Login</button>
                    </div>
                    <div className='text-blue-500 mt-2'>
                        <Link to='/signup'>Don't have an account?</Link>
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

export default Login;
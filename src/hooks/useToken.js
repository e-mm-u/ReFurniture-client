import { useEffect, useState } from 'react';

const useToken = (email) => {
    const [token, setToken] = useState(null);

    useEffect(()=>{
        if(email){
            fetch(`https://server-two-mu.vercel.app/jwt?email=${email}`)
                .then( res => res.json())
                .then( data => {
                    if(data.access_token){
                        localStorage.setItem('access_token', data.access_token);
                        setToken(data.access_token)
                    }
                });
        }
    }, [email])

    return {token};
};

export default useToken;
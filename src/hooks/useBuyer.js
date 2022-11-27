import { useEffect, useState } from "react";

const useBuyer = email => {

    const [isBuyer, setIsBuyer] = useState('');
    const [buyerLoading, setBuyerLoading] = useState(true);

    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5000/users/buyer/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsBuyer(data.isAdmin);
                    setBuyerLoading(false);
                })
        }

    },[email])


    return [isBuyer, buyerLoading] ;
};

export default useBuyer;
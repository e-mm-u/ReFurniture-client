import { useEffect, useState } from "react";

const useSeller = email => {

    const [isSeller, setIsSeller] = useState('');
    const [sellerLoading, setSellerLoading] = useState(true);

    useEffect(()=>{
        if(email){
            fetch(`http://localhost:5000/users/seller/${email}`)
                .then(res => res.json())
                .then(data => {
                    setIsSeller(data.isAdmin);
                    setSellerLoading(false);
                })
        }

    },[email])


    return [isSeller, sellerLoading] ;
};

export default useSeller;
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Shared/Loading/Loading';
import { AuthContext } from '../Context/AuthContextProvider';
import useSeller from '../hooks/useSeller';

const SellerRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isSeller, sellerLoading] = useSeller(user?.email);
    const location = useLocation();

    if( loading || sellerLoading){
        return <Loading></Loading>
    }

    if( user && isSeller ){
        return children;
    }
    
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default SellerRoutes;
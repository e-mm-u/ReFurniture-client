import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Shared/Loading/Loading';
import { AuthContext } from '../Context/AuthContextProvider';
import useBuyer from '../hooks/useBuyer';

const BuyerRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isBuyer, buyerLoading] = useBuyer(user?.email);
    const location = useLocation();

    if( loading || buyerLoading){
        return <Loading></Loading>
    }

    if( user && isBuyer ){
        return children;
    }
    
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default BuyerRoutes;
import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../components/Shared/Loading/Loading';
import { AuthContext } from '../Context/AuthContextProvider';
import useAdmin from '../hooks/useAdmin';

const AdminRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(user?.email);
    const location = useLocation();

    if( loading || adminLoading){
        return <Loading></Loading>
    }

    if( user && isAdmin ){
        return children;
    }
    
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default AdminRoutes;
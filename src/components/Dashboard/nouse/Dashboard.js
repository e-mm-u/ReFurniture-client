import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContextProvider';
import AdminDashboard from './AdminDashboard';
import BuyerDashboard from './BuyerDashboard';
import SellerDashboard from './SellerDashboard';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [role, setRole] = useState(null)
    const email = user?.email;
    fetch(`https://server-two-mu.vercel.app/users?email=${email}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            setRole(data[0]?.role)
        });


    // console.log(role);
    const renderSwitch = role =>{
        switch (role) {
            case 'admin':
                return <AdminDashboard></AdminDashboard>
            case 'seller':
                return <SellerDashboard></SellerDashboard>
            case 'buyer':
                return <BuyerDashboard></BuyerDashboard>
            default:
                return null
        }
    }

    return (
        <div>
            {
                renderSwitch(role)
            }
        </div>
    )

};

export default Dashboard;
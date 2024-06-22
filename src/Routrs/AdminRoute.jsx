import React from 'react';
import useRole from '../Component/hooks/useRole';
import LoadingSpinner from '../Component/LoadingSpinner';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    if (role === 'admin') return children
    return <Navigate to='/dashboard' />
};

export default AdminRoute;
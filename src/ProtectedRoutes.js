import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const [isLogin , setIsLogin] = useState(true);
    useEffect(() =>{
        if (!localStorage.getItem("user")) {
            setIsLogin(false)
        }
    },[]);
    return isLogin ? <Outlet/> : <Navigate to='/login' />;
}

export default ProtectedRoutes;
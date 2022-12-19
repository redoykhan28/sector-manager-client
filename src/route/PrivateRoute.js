import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';

const PrivateRoute = ({ children }) => {
    //use context
    const { user, loader } = useContext(authContext)
    //set location
    const location = useLocation();

    //if loader true
    if (loader) {
        <div className="d-flex justify-content-center">
            <div className="spinner-grow text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }

    if (!user) {

        return <Navigate to='/login' state={{ from: location }} replaced></Navigate >
    }
    else {

        return children;
    }
};

export default PrivateRoute;
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';

const Nav = () => {
    //use navigation
    const navigate = useNavigate();

    //use location
    const location = useLocation();

    const from = location?.state?.from?.pathname || '/';
    //use context
    const { signout, user } = useContext(authContext);
    //signout
    const handleSignOut = () => {

        signout()
            .then(result => {
                navigate(from, { replaced: true })
            })
    }

    return (
        <div>
            <nav className="navbar bg-light">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">Sector Manager</Link>
                    <div className="d-flex">
                        {
                            user &&


                            <button onClick={handleSignOut} className='btn btn-secondary'>Logout</button>


                        }
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
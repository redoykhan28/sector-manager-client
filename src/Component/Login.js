import React, { useContext, useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';

const Login = () => {

    //set state for error
    const [error, setError] = useState(null);

    //state for mail
    const [mail, setMail] = useState(null);


    //use navigation
    const navigate = useNavigate();

    //use location
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    //use context
    const { emailPassLogin } = useContext(authContext);

    //submit button handling
    const submitHandler = (e) => {

        e.preventDefault();
        let form = e.target;
        let email = form.email.value;
        let password = form.password.value;
        // console.log(email, password)

        emailPassLogin(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                form.reset();
                setError(null)
                toast.success('Login Successful');
                navigate(from, { replaced: true })
            })
            .catch(err => {

                console.log(err)
                setError(err.message)
            })
    }

    return (
        <div className='container'>
            <div className={"card  p-3 loginCard"}>

                <div className="card-body">
                    <h5 className='mb-5'>Login</h5>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label input">Email address</label>
                            <input name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input name='password' type="password" className="form-control" id="exampleInputPassword1" required />
                        </div>

                        <button type="submit" className="btn mt-4 mb-2 rounded-0 logbtn">Login</button>
                        <small className='text-danger'>{error}</small>


                        <p className='text-center mt-5'><small>Don't Have an Account?<Link to={'/signup'} className='clr text-decoration-none '> Create Account</Link> </small></p>
                    </form>
                </div>
            </div>

            <Toaster />
        </div>

    );
};

export default Login;
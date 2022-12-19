import React, { useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';
import './style.css'

const Signup = () => {

    const navigate = useNavigate()

    //state for error
    const [error, setError] = useState(null)

    //state for success
    const [success, setSuccess] = useState(null)


    //use context
    const { emailPassSignup, updateUser } = useContext(authContext)



    //submit button handling
    const submitHandler = (e) => {

        e.preventDefault();
        let form = e.target;
        let email = form.email.value;
        let password = form.password.value;
        console.log(email, password)

        if (password.length < 8) {

            setError('Password Should be 8 lenght long!')
            return
        }

        //setup signup
        emailPassSignup(email, password)
            .then(result => {

                const user = result.user
                console.log(user)
                form.reset();
                setSuccess('Signup Successful')
                navigate('/')
                setError(null)
            })
            .catch(err => {
                console.log(err)
                setError('Email is already in use')
            })
    }



    return (
        <div className="container">
            <div className="card  p-3 loginCard">

                <div className="card-body">
                    <h5 className='mb-5'>SignUp</h5>
                    <form onSubmit={submitHandler}>

                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label input">Email address</label>
                            <input name='email' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input name='password' type="password" className="form-control" id="exampleInputPassword1" required />
                        </div>

                        <button type="submit" className="btn mt-4 mb-2 rounded-0 signUpbtn">SignUp</button>
                        {/* <small className='text-danger'>{error}</small>
                        <small className='text-success'>{success}</small> */}


                        <p className='text-center mt-5'><small>Already have an account?<Link to={'/login'} className='clr2 text-decoration-none '> Login</Link> </small></p>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default Signup;
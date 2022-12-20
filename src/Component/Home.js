import React, { useContext, useEffect, useState } from 'react';
import banner from '../images/Checklist.jpg'
import './style.css'
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import Sectors from './Sectors';
import { authContext } from '../Context/AuthContext';
import { Link } from 'react-router-dom';


const Home = () => {

    //usecontext
    const { user } = useContext(authContext)

    //using react hook form
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    //handle form
    const handleStore = (data) => {

        // console.log(data)

        const name = data.name;
        const email = user?.email;
        const agrement = data.check;
        const sector = data.sector[0]

        const info = { name, email, agrement, sector }
        console.log(info)

        fetch('https://sector-form-server.vercel.app/userSector', {

            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged) {

                    console.log(data)
                    toast.success('added successfully')
                    reset()
                }

            })
    }

    const [options, setOptions] = useState([])

    useEffect(() => {
        fetch('https://sector-form-server.vercel.app/sectors')
            .then(res => res.json())
            .then(data => setOptions(data))
    }, [])


    return (
        <div className='container'>
            <div className="row gx-5 r1">
                <div className="col-lg-6">
                    <img data-aos="zoom-out" className='img-fluid' src={banner} alt="Banner" />
                </div>
                {
                    user ?
                        <div data-aos="fade-down" className="col-lg-6">
                            <div className='p-5 rounded-5 shadow-lg'>
                                <h4 className='mt-3 mb-4 primary-text'>Please enter your name and pick the Sectors you are currently involved in,
                                </h4>
                                <form onSubmit={handleSubmit(handleStore)}>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input {...register('name', { required: 'This field is required' })} type="text" className="form-control rounded-5" id="exampleInputEmail1" aria-describedby="emailHelp" />

                                        {errors.name && <p className='text-danger'><small>{errors.name.message}</small></p>}
                                    </div>
                                    <div>
                                        <label htmlFor="exampleInputEmail1" className="form-label">Sectors</label>
                                        <select  {...register('sector', { required: 'This field is required' })} className="form-select rounded-3" multiple aria-label="multiple select example">
                                            {
                                                options?.map(option =>

                                                    <optgroup label={option?.group}>
                                                        {
                                                            option.option.map(op =>
                                                                <>
                                                                    <option>
                                                                        {op?.op1?.label}
                                                                    </option>
                                                                    <option>
                                                                        {op?.op2?.label}
                                                                    </option>

                                                                    <option>
                                                                        {op?.op3?.label}
                                                                    </option>
                                                                    {
                                                                        op?.op3?.sub?.map(s => <Sectors key={s.id}
                                                                            sub={s} ></Sectors>
                                                                        )}
                                                                    <option>
                                                                        {op?.op4?.label}
                                                                    </option>
                                                                    {
                                                                        op?.op4?.sub?.map(s => <Sectors key={s.id}
                                                                            sub={s} ></Sectors>
                                                                        )}
                                                                    <option>
                                                                        {op?.op5?.label}
                                                                    </option>
                                                                    {
                                                                        op?.op5?.sub?.map(s => <Sectors key={s.id}
                                                                            sub={s} ></Sectors>
                                                                        )}
                                                                    <option>
                                                                        {op?.op6?.label}
                                                                    </option>
                                                                    {
                                                                        op?.op6?.sub?.map(s => <Sectors key={s.id}
                                                                            sub={s} ></Sectors>
                                                                        )}
                                                                    <option>
                                                                        {op?.op7?.label}
                                                                    </option>
                                                                    {
                                                                        op?.op7?.sub?.map(s => <Sectors key={s.id}
                                                                            sub={s} ></Sectors>
                                                                        )}
                                                                    <option>
                                                                        {op?.op8?.label}
                                                                    </option>
                                                                    {
                                                                        op?.op8?.sub?.map(s => <Sectors key={s.id}
                                                                            sub={s} ></Sectors>
                                                                        )}

                                                                </>
                                                            )
                                                        }
                                                    </optgroup>

                                                )
                                            }
                                        </select>

                                        {errors.sector && <p className='text-danger'><small>{errors.sector.message}</small></p>}
                                    </div>
                                    <div className="mb-3 mt-2 form-check">
                                        <input {...register('check', { required: 'This field is required' })} type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>

                                        {errors.check && <p className='text-danger'><small>{errors.check.message}</small></p>}
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <button type="submit" className="btn bt secondary-bg text-white">Submit</button>

                                        <Link to={'/my-sector'} className="btn primary-bg text-white bt">My Data</Link>

                                    </div>
                                </form>

                            </div>
                        </div>
                        :
                        <div data-aos="fade-down" className="col-lg-6">
                            <div className='p-5 rounded-5 shadow-lg'>
                                <h1 className='secondary-text'>Welcome to Sector Manager</h1>
                                <h6 className='my-3 primary-text'>For adding a sector, Please Click here to login <Link to={'/login'}>Login</Link> </h6>
                            </div>
                        </div>
                }
            </div>
            <Toaster />
        </div>
    );
};

export default Home;
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import Sectors from './Sectors';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';

const Update = () => {


    //using react hook form
    const { register, handleSubmit, formState: { errors } } = useForm()

    const userInfo = useLoaderData()[0]
    // console.log(dt)

    const [options, setOptions] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/sectors')
            .then(res => res.json())
            .then(data => setOptions(data))
    }, [])



    //handle form
    const handleStore = (data) => {

        console.log(data)

        const name = data.name;
        const agrement = data.check;
        const sector = data.sector[0]

        const info = { name, agrement, sector }

        fetch(`http://localhost:5000/update/${userInfo._id}`, {

            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info)
        })
            .then(res => res.json())
            .then(data => {

                console.log(data)
                toast.success('Updated successfully')
            })
    }

    return (
        <div className='container'>
            <h1 data-aos="zoom-out" className='secondary-text mt-4 mb-5'>Update Data</h1>
            <div data-aos="fade-up">
                <form onSubmit={handleSubmit(handleStore)}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input defaultValue={userInfo.name} {...register('name', { required: 'This field is required' })} type="text" className="form-control rounded-5" id="exampleInputEmail1" aria-describedby="emailHelp" />

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
                        <input checked {...register('check', { required: 'This field is required' })} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>

                        {errors.check && <p className='text-danger'><small>{errors.check.message}</small></p>}
                    </div>
                    <div className='d-flex justify-content-between'>
                        <button type="submit" className="btn bt secondary-bg text-white">update</button>

                        <Link to={'/my-sector'} className="btn primary-bg text-white bt">My Data</Link>

                    </div>
                </form>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Update;
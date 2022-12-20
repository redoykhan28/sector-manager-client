import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../Context/AuthContext';

const MySector = () => {

    const { user } = useContext(authContext)

    const [sectors, setSector] = useState([])

    useEffect(() => {
        fetch(`https://sector-form-server.vercel.app/mySector?email=${user.email}`)
            .then(res => res.json())
            .then(data => setSector(data))
    }, [user])

    return (
        <div className='container'>
            <h1 data-aos="fade-up" className='secondary-text mt-4 mb-5'>My Data</h1>
            <div data-aos="zoom-in" className='mt-5'>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Sector</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sectors.map(sector =>
                                <tr key={sector._id}>
                                    <td>{sector.name}</td>
                                    <td>{sector.email}</td>
                                    <td>{sector.sector}</td>
                                    <td><Link to={`/update/${sector._id}`} className='btn btn-success'>Edit</Link></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySector;
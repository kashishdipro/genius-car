import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const {img, title, price, _id} = service;
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl mb-10">
            <figure><img className='w-full h-52' src={img} alt="" /></figure>
            <div className="card-body">
                <div className='flex justify-between items-center'>
                    <div>
                        <h2 className="card-title">{title}</h2>
                        <p className='text-2xl font-semibold text-warning'>${price}</p>
                    </div>
                    <div className="card-actions">
                        <Link to={`/checkout/${_id}`} className="btn btn-warning btn-circle">❯</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const CheckOut = () => {
    const {_id, title, price} = useLoaderData();
    const {user} = useContext(AuthContext);

    const handlePlaceOrder = event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        // if(phone.length > 11){
        //     alert('Phone number should be 11 digits')
        // }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                alert('Order placed successfully')
                form.reset();
            }
        })
        .catch(err => console.error(err))
    }
    return (
        <section className='my-10 mx-5'>
            <form onSubmit={handlePlaceOrder}>
                <div className='my-5'>
                    <h2 className="text-2xl font-semibold">You are about to order: {title}</h2>
                    <h2 className="text-xl font-semibold text-warning">Price: {price}</h2>
                </div>
                <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                    <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full" />
                    <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full" />
                    <input name='phone' type="text" placeholder="Your Phone" className="input input-bordered w-full" required/>
                    <input name='email' type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full" readOnly/>
                </div>
                <textarea name='message' className="textarea textarea-bordered h-40 w-full my-5" placeholder="Your Message" required></textarea>
                <input type="submit" className='btn btn-warning w-full' value="Place Your Order" />
            </form>
        </section>
    );
};

export default CheckOut;
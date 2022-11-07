import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRowTable from './OrderRowTable';

const Orders = () => {
    const {user, logOut} = useContext(AuthContext);
    console.log(user?.email);
    const [orders, setOrders] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            }
        })
        .then(res => {
            if(res.status === 401 || res.status === 403){
                return logOut();
            }
            return res.json();
        })
        .then(data => setOrders(data))
    },[user?.email, logOut])

    const handleDelete = id =>{
        const proceed = window.confirm('Are you sure, you want to cancel this order');
        if(proceed){
            fetch(`http://localhost:5000/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('genius-token')}`
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount){
                    alert('Order cancel Successfully')
                    const remaining = orders.filter(order => order._id !== id);
                    setOrders(remaining);
                }
            })
        }
    }

    const handleStatusUpdate = id =>{
        fetch(`http://localhost:5000/orders/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type' : 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body:JSON.stringify({status:'Approved'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                const remaining = orders.filter(order => order._id !== id);
                const approving = orders.find(order => order._id === id);
                approving.status = 'Approved';
                const newOrders = [approving, ...remaining];
                setOrders(newOrders);
            }
        })
    }
    
    return (
        <section className='my-10'>
            <h2 className="text-5xl">You have: {orders.length}orders</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                            <label>
                                <input type="checkbox" className="checkbox" />
                            </label>
                            </th>
                            <th>Name</th>
                            <th>Service Name</th>
                            <th>Favorite Color</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order =><OrderRowTable 
                            key={order._id}
                            order={order}
                            handleDelete={handleDelete}
                            handleStatusUpdate={handleStatusUpdate}
                            />)
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Orders;
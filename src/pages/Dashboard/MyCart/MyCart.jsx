import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCart from '../../../hooks/useCart';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyCart = () => {
    const [cart, refetch] = useCart();
    const total = cart.reduce((sum, item) => item.price + sum, 0);
    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }

                    })
            }
        })
    }
    return (
        <div className='w-full'>
            <Helmet>
                <title>Chef Table | My Cart</title>
            </Helmet>
            <div className='uppercase  h-[90] font-semibold flex justify-around items-center bg-base-300 py-3'>
                <h4> Total Items : {cart.length}</h4>
                <h4>Total Price : ${total}</h4>
                <Link to='/dashboard/payment'><button className="btn btn-warning btn-sm">pay</button></Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table border">
                    {/* head */}
                    <thead  >
                        <tr>
                            <th>#</th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td className=''>${item.price}</td>
                            <td>
                                <button onClick={() => handleDelete(item)} className="btn btn-ghost text-white bg-red-500"><FaTrashAlt /></button>
                            </td>
                        </tr>)}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyCart;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageBookings = () => {
    const [axiosSecure] = useAxiosSecure();
    const { data: bookings = [], refetch } = useQuery(['bookings'], async () => {
        const res = await axiosSecure.get('/allbookings')
        return res.data;
    })
    const handleStatusUpdate = (id) => {
        const status = {
            id: id,
            status: "approved",
        };
        fetch("http://localhost:5000/bookingStatusUpdate", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(status),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "booking approved successful",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            refetch();
                        }
                    });
                }
            });
    };
    const handleDelete = id => {
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
                fetch(`http://localhost:5000/bookings/${id}`, {
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
    // const handleDeleted = id => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             fetch(`http://localhost:5000/bookings/${id}`, {
    //                 method: 'DELETE'
    //             })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     if (data.deletedCount > 0) {
    //                         Swal.fire(
    //                             'Deleted!',
    //                             'Your booking has been deleted.',
    //                             'success'
    //                         )
    //                         const remaining = bookings.filter(booking => booking._id !== id);
    //                         setBookings(remaining);
    //                     }
    //                 })
    //         }
    //     })
    // }
    return (
        <div className='w-full'>
            <Helmet>
                <title>Chef Table | All Bookings</title>
            </Helmet>
            <div>
                <h2 className='text-3xl font-semibold my-4 text-center'>Total bookings: {bookings.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Guests</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => <tr key={booking._id}>
                            <th>{index + 1}</th>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.number}</td>
                            <td>{booking.date}</td>
                            <td>{booking.time}</td>
                            <td>{booking.guests}</td>
                            <td className="fs-6">
                                {booking.status === "approved" ? (
                                    "Approved"
                                ) : (
                                    <button className="btn btn-primary px-2 py-0"
                                        onClick={() => handleStatusUpdate(booking._id)}
                                    >
                                        Approved
                                    </button>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleDelete(booking._id)} className="btn btn-ghost text-white bg-red-500"><FaTrashAlt /></button>
                            </td>

                        </tr>)}

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageBookings;
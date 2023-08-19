import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import BookingTable from '../BookingTable/BookingTable';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyBooking = () => {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [url]);

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
                            Swal.fire(
                                'Deleted!',
                                'Your booking has been deleted.',
                                'success'
                            )
                            const remaining = bookings.filter(booking => booking._id !== id);
                            setBookings(remaining);
                        }
                    })
            }
        })
    }


    return (
        <div className='w-full'>
            <Helmet>
                <title>Chef Table | My Booking</title>
            </Helmet>
            <h2 className="text-3xl mb-9 text-center">Number of bookings: {bookings.length}</h2>
            <div className="overflow-x-auto w-full ">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Customer Name</th>
                            <th>Category</th>
                            <th>Phone Number</th>
                            <th>Total Guest</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingTable
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                            ></BookingTable>)
                        }
                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default MyBooking;
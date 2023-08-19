import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import 'react-datepicker/dist/react-datepicker.css';
import SectionTitle from '../../../CommonComponents/SectionTitle/SectionTitle';
import moment from 'moment/moment';
import Marquee from 'react-fast-marquee';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

const Reservation = () => {
    const { user } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                reset();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your booking Added Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                console.error('Failed to confirm reservation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('data', data);
    };

    return (
        <div className='w-full h-full px-8 bg-slate-100 border'>
            <Marquee className='text-orange-700 font-semibold' speed={100}>Book your reservation soon! Come hungry, leave happy. </Marquee>
            <SectionTitle subHeading={moment().format("dddd, MMMM Do YYYY")} heading={"Reserve Your Table"}></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input
                            type="text" defaultValue={user?.displayName}
                            {...register('name')}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input
                            type="text" defaultValue={user?.email}
                            {...register('email')}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Reservation Date </span>
                        </label>
                        <input
                            type="date"
                            {...register('date')}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Reservation Time</span>
                        </label>
                        <input
                            type="time"
                            {...register('time')}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Contact Number</span>
                        </label>
                        <input
                            type="number"
                            {...register('number')}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">No of Guests</span>
                        </label>
                        <input
                            type="number"
                            {...register('guests')}
                            className="input input-bordered"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled >Pick One</option>
                            <option>Dinner</option>
                            <option>Birthday/Anniversary</option>
                            <option>Private</option>
                            <option>Corporate</option>
                            <option>Holiday</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Special Requests</span>
                        </label>
                        <textarea
                            rows="4"
                            {...register('specialRequests')}
                            className="input input-bordered"
                        />
                    </div>

                </div>

                <div className="form-control mt-8">
                    <input className="btn btn-primary btn-block" type="submit" value="Confirm Reservation" />
                </div>
            </form>
        </div>
    );
};

export default Reservation;
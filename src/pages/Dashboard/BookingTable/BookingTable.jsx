import React from 'react';
import { FaTrashAlt, FaUserShield } from 'react-icons/fa';

const BookingTable = ({ booking, handleDelete }) => {
    const { _id, date, time, name, category, number, guests, status } = booking;
    return (
        <tr>
            <td>{name}</td>
            <td> {category} </td>
            <td> {number} </td>
            <td> {guests} </td>
            <td> {date} </td>
            <td>{time}</td>
            <th>
                {status ? status : 'Pending'}
            </th>
            <th>
                <button onClick={() => handleDelete(_id)} className="btn btn-ghost text-white bg-red-500 ">
                    <FaTrashAlt className='fs-2' />
                </button>
            </th>
        </tr>
    );
};

export default BookingTable;
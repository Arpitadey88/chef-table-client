import React from 'react';
import SectionTitle from '../../../CommonComponents/SectionTitle/SectionTitle';
import useMenu from '../../../hooks/useMenu';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const ManageItems = () => {
    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();
    // const { _id } = menu;
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
                axiosSecure.delete(`/menu/${item._id}`)
                    .then(res => {
                        console.log('deleted response', res.data);
                        refetch();
                    })
            }
        })
    }
    return (
        <div className='w-full px-8 py-9 bg-slate-100 border'>
            <SectionTitle subHeading="Hurry Up" heading="Manage All Items"></SectionTitle>
            <h2 className='text-2xl text-center'>Total Item: {menu.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th className='text-right'>Price</th>
                            <th className='text-right'>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((item, index) => <tr key={item._id}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td className=' text-right '>{item.price}</td>
                            <td className='text-end'>
                                <Link to={`/dashboard/updateItem/${item._id}`}><button className="btn btn-ghost text-white bg-green-500 btn-sm"><FaEdit /></button></Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item)} className="btn btn-ghost btn-sm text-white bg-red-500"><FaTrashAlt /></button>
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItems;
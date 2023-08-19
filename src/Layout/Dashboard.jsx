import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaShoppingCart, FaWallet, FaCalendarAlt, FaHome, FaCalendarCheck, FaStar, FaShoppingBag, FaPhoneSquareAlt, FaCheese, FaUsers, FaBook, } from 'react-icons/fa';
import { GrMenu } from "react-icons/gr";
import { FaUtensils } from "react-icons/fa";
import { BsMenuUp } from "react-icons/bs";
// import { BiSolidCalendarCheck } from "react-icons/bs";

import { NavLink, Outlet } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
    const [cart] = useCart();

    // const isAdmin = true;
    const [isAdmin] = useAdmin();

    return (
        <>
            <Helmet>
                <title>Chef Table | Dashboard</title>
            </Helmet>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <Outlet></Outlet>
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-[#D1A054]">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

                    <ul className="menu p-4 w-80 h-full">
                        {
                            isAdmin ? <>
                                <li><NavLink to='/dashboard/admindashboard'><FaHome />Admin Home</NavLink></li>
                                <li><NavLink to='/dashboard/addItem'><FaUtensils />Add An Item</NavLink></li>
                                <li><NavLink to='/dashboard/manageItems'><BsMenuUp />Manage Items</NavLink></li>
                                <li><NavLink to='/dashboard/allbooking'><FaBook />Manage Bookings</NavLink></li>
                                <li><NavLink to='/dashboard/allusers'><FaUsers />All Users</NavLink></li>
                            </> : <>
                                <li><NavLink to='/dashboard/userdashboard'><FaHome />User Home</NavLink></li>
                                <li><NavLink to='/dashboard/payhistory'><FaWallet />Payment History</NavLink></li>
                                <li><NavLink to='/dashboard/reservations'><FaCalendarAlt />Reservations</NavLink></li>
                                <li><NavLink to='/dashboard/mycart'><FaShoppingCart />My Cart
                                    <span className="badge badge-secondary">{cart?.length || 0}</span></NavLink></li>
                                <li><NavLink to='/dashboard/mybooking'><FaCalendarCheck />My Booking</NavLink></li>
                                <li><NavLink to='/dashboard/addreview'><FaStar />Add Review</NavLink></li>
                            </>}
                        {/* Sidebar content here */}

                        <div className="divider"></div>
                        <li><NavLink to='/'><FaHome />Home</NavLink></li>
                        <li><NavLink to='/menu'><GrMenu />Our Menu</NavLink></li>
                        <li><NavLink to='/order/salad'><FaCheese />Order Food</NavLink></li>
                        <li><NavLink to='/'><FaShoppingBag />Shop</NavLink></li>
                        <li><NavLink to='/contact'><FaPhoneSquareAlt /> Contact</NavLink></li>
                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;
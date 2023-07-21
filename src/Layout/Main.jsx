import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const Main = () => {
    const location = useLocation();
    console.log(location);
    const exist = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div>
            {exist || <Navbar></Navbar>}
            <Outlet></Outlet>
            {exist || <Footer></Footer>}
        </div>
    );
};

export default Main;
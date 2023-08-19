import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/icon/logo.png'
import { AuthContext } from '../../../providers/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
import useCart from '../../../hooks/useCart';
import useAdmin from '../../../hooks/useAdmin';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();

    const handleSignOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navOptions = <>
        <li><Link className='hover:bg-amber-500 hover:text-white' to='/'>Home</Link></li>
        <li><Link className='hover:bg-amber-500 hover:text-white' to='/menu'>Our Menu</Link></li>
        <li><Link className='hover:bg-amber-500 hover:text-white' to={isAdmin ? '/dashboard/admindashboard' : '/dashboard/userdashboard'}>Dashboard</Link></li>
        <li><Link className='hover:bg-amber-500 hover:text-white' to='/order/salad'>Order Food</Link></li>

        <li><Link to='/dashboard/mycart'><a className="btn btn-sm text-amber-500"><FaShoppingCart />
            <div className="badge bg-amber-500 text-white">{cart?.length || 0}</div></a>
        </Link></li>

    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-2xl px-20 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>

                    <a className="flex align-middle normal-case text-xl font-bold  text-amber-500"><img style={{ width: '38px' }} src={logo} alt="" /> <span className='pt-4'>Chef Table</span> </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <><span className='m-2'>{user?.displayName}</span>
                                <button onClick={handleSignOut} className="btn btn-sm btn-ghost bg-amber-500 normal-case">Sign Out</button></>
                            : <>
                                <Link to='/login'><button className="btn btn-sm bg-amber-500 normal-case">Sign In</button></Link>
                            </>
                    }
                </div>
            </div>
        </>
    );
};

export default Navbar;
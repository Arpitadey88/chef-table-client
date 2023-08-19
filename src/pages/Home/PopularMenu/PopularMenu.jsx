import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../CommonComponents/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';
import FoodVarient from '../FoodVarient/FoodVarient';
import { Link } from 'react-router-dom';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularItems = menu.filter(item => item.category === 'popular');
    return (
        <section className='lg:px-20 mb-12'>
            <SectionTitle subHeading={"Popular Items"} heading={"From Our Menu"}></SectionTitle>
            <FoodVarient></FoodVarient>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popularItems.map(item => <MenuItem
                        key={item._id} item={item}>
                    </MenuItem>)
                }
            </div>
            <div className='text-center mt-6'><Link to='/menu'><button className=" btn btn-outline border-0 border-b-4 mt-4">View Full menu</button></Link> </div>
        </section>
    );
};

export default PopularMenu;
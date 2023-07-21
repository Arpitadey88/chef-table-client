import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../CommonComponents/SectionTitle/SectionTitle';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {
    const [menu] = useMenu();
    const popularItems = menu.filter(item => item.category === 'popular');
    return (
        <section className='mb-12'>
            <SectionTitle subHeading={"Popular Items"} heading={"From Our Menu"}></SectionTitle>
            <div className='grid md:grid-cols-2 gap-10'>
                {
                    popularItems.map(item => <MenuItem
                        key={item._id} item={item}>
                    </MenuItem>)
                }
            </div>
            <div className='text-center mt-6'><button className=" btn btn-outline border-0 border-b-4 mt-4">View Full menu</button></div>
        </section>
    );
};

export default PopularMenu;
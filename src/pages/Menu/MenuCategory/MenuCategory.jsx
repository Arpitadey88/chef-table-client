import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import CoverImage from '../../Shared/CoverImage/CoverImage';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items, title, bgImg }) => {

    return (
        <div className='pt-8'>
            {title && <CoverImage img={bgImg} title={title}></CoverImage>}
            <div className='grid md:grid-cols-2 gap-10 my-16'>
                {
                    items.map(item => <MenuItem
                        key={item._id} item={item}>
                    </MenuItem>)
                }
            </div>
            <div className='text-center'>
                <Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-4">Order Now</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;
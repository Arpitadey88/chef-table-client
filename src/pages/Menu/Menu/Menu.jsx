import React from 'react';
import { Helmet } from 'react-helmet-async';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import PopularMenu from '../../Home/PopularMenu/PopularMenu';
import CoverImage from '../../Shared/CoverImage/CoverImage';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../CommonComponents/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const soup = menu.filter(item => item.category === 'soup');
    const salad = menu.filter(item => item.category === 'salad');
    const pizza = menu.filter(item => item.category === 'pizza');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Chef Table | Menu</title>
            </Helmet>
            <CoverImage img={menuImg} title="Our Menu"></CoverImage>
            {/* Main Cover */}
            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"}></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
            {/* desert menu items */}
            <MenuCategory items={desserts} title={"dessert"} bgImg={dessertImg}></MenuCategory>
            {/* pizza menu items */}
            <MenuCategory items={pizza} title={"pizza"} bgImg={pizzaImg}></MenuCategory>
            {/* soup menu items */}
            <MenuCategory items={soup} title={"soup"} bgImg={soupImg}></MenuCategory>
            {/* salads menu items */}
            <MenuCategory items={salad} title={"salad"} bgImg={saladImg}></MenuCategory>
        </div>
    );
};

export default Menu;
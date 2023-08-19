import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Featured from '../Featured/Featured';
import Testimonials from '../Testimonials/Testimonials';
import { Helmet } from 'react-helmet-async';
import AnimatedBanner from '../AnimatedBanner/AnimatedBanner';

const Home = () => {
    return (
        <div className='w-full'>
            <Helmet>
                <title>Chef Table | Home</title>
            </Helmet>
            <AnimatedBanner></AnimatedBanner>
            <Category></Category>
            <Banner></Banner>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;
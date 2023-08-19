import React from 'react';
import SectionTitle from '../../../CommonComponents/SectionTitle/SectionTitle';
import featuredImg from '../../../assets/home/featured.jpg';
import './Featured.css';

const Featured = () => {
    return (
        <section className='featured-item bg-fixed text-white text-lg pt-10 my-20'>
            <SectionTitle subHeading={"Check It Out"} heading={"Featured Items"}>
            </SectionTitle>
            <div className='md:flex justify-center items-center pb-20 pt-12 px-36'>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2023</p>
                    <p className='uppercase'>where can i get some</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, optio ullam et ex asperiores facere! Quibusdam laboriosam corporis beatae repellendus? Blanditiis veniam eum, rem doloremque amet numquam magni saepe dolores?</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </section>
    );
};

export default Featured;
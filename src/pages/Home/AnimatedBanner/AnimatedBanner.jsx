import React from 'react';
import heroImg from '../../../assets/menu/hero-header.png';
import './AnimatedBanner.css';

const AnimatedBanner = () => {
    return (
        <div className="overflow-hidden">
            <div className="container mt-20 py-3">
                <div className="grid md:grid-cols-2 items-center justify-center py-lg-4">

                    <div className=" col-12 lg:col-6">
                        <div className="text-center lg:text-left ani-text lg:pl-20">
                            <h1 className="text-light text-4xl lg:text-6xl font-bold my-4">
                                HUNGRY?? <br /> YOU ARE IN THE RIGHT PLACE
                            </h1>
                            <p className="text-muted text-2xl lg:text-3xl font-semibold">
                                FASTEST DELIVERY & EASY PICKUP WITH ONE CLICK!!
                            </p>
                        </div>
                    </div>
                    <div className="mt-15 lg:mt-15 col-12 lg:col-6" >
                        <img className="w-full lg:w-auto ml-20 lg:pl-20 image-hover ani-img" src={heroImg} alt="" />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AnimatedBanner;
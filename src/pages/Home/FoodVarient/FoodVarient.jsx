import React from 'react';
import pizza from '../../../assets/menu/pizza-bg.jpg';
import soup from '../../../assets/menu/soup-bg.jpg';
import dessert from '../../../assets/menu/dessert-bg.jpeg';
import sandwich from '../../../assets/menu/Sandwich.png';
import chicken from '../../../assets/menu/chicken lolipop.jpg';
import salad from '../../../assets/dashboard/slide5.jpg';
import { Link } from 'react-router-dom';

const FoodVarient = () => {
    return (
        <div className="container py-6 mb-9">
            <div className="flex items-center justify-between my-4">
                <h1 className="font-bold text-2xl">
                    Search by Food
                </h1>
                <Link classNameName='font-bold' to='/menu'>
                    VIEW ALL <i className="fas fa-chevron-right"></i>
                </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">

                <div className="col effect-1">
                    <img className="rounded-full h-28 w-28 mx-auto" src={soup} alt="" />
                    <h5 className="font-bold mt-3">
                        Burger
                    </h5>
                </div>
                <div className="col effect-1">
                    <img className="rounded-full h-28 w-28 mx-auto" src={pizza} alt="" />
                    <h5 className="font-bold mt-3">
                        Pizza
                    </h5>
                </div>
                <div className="col effect-1">
                    <img className="rounded-full w-28 h-28  mx-auto" src={dessert} alt="" />
                    <h5 className="font-bold mt-3">
                        dessert
                    </h5>
                </div>
                <div className="col effect-1">
                    <img className="rounded-full w-28 h-28 mx-auto" src={salad} alt="" />
                    <h5 className="font-bold mt-3">
                        Salad
                    </h5>
                </div>
                <div className="col effect-1">
                    <img className="rounded-full w-28 mx-auto" src={sandwich} alt="" />
                    <h5 className="font-bold mt-3">
                        Sandwiches
                    </h5>
                </div>
                <div className="col effect-1">
                    <img className="rounded-full w-28 mx-auto" src={chicken} alt="" />
                    <h5 className="font-bold mt-3">
                        Chicken BBQ
                    </h5>
                </div>

            </div>
        </div>

    );
};

export default FoodVarient;
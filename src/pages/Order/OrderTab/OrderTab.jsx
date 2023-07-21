import React from 'react';
import FoodCard from '../../../CommonComponents/FoodCard/FoodCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
import { Pagination } from 'swiper';
// TODO: implement pagination here

const OrderTab = ({ items }) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    return (
        <Swiper
            pagination={pagination}
            modules={[Pagination]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className='grid md:grid-cols-3 gap-10'>
                    {
                        items.map(item => <FoodCard
                            key={item._id} item={item}>
                        </FoodCard>)
                    }
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default OrderTab;
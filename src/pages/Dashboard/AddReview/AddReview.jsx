import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import SectionTitle from '../../../CommonComponents/SectionTitle/SectionTitle';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token
console.log(img_hosting_token);

const AddReview = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
    const onSubmit = data => {
        const formData = new FormData();
        formData.append('image', data.image[0])

        fetch(image_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                console.log(imgResponse);
                if (imgResponse.success) {
                    const imgUrl = imgResponse.data.display_url;
                    const { name, details, rating } = data;
                    const newReview = { name, rating: parseFloat(rating), details, image: imgUrl }
                    console.log(newReview);
                    axiosSecure.post('/reviews', newReview)
                        .then(data => {
                            console.log('after posting user review', data.data);
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'review Added Successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
        console.log(data);
    };
    return (
        <div className='w-full px-8 py-9 bg-slate-100 border'>
            <SectionTitle subHeading="What's New" heading="Add An Item"></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-sm py-3">
                    <label className="label">
                        <span className="label-text">Upload Image</span>
                    </label>
                    <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-sm" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">User Name*</span>
                    </label>
                    <input type="text" placeholder="Your Name" {...register("name", { required: true, maxLength: 120 })} className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Ratings*</span>
                    </label>
                    <input {...register("rating", { required: true })} type="number" placeholder="Type here" className="input input-bordered w-full " />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Text Details*</span>

                    </label>
                    <textarea {...register("details", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                </div>

                <input className='btn btn-md px-9 btn-neutral mt-4' type="submit" value="Add Review" />
            </form>
        </div>
    );
};

export default AddReview;
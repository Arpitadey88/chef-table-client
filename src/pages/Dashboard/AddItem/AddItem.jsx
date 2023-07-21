import React from 'react';
import SectionTitle from '../../../CommonComponents/SectionTitle/SectionTitle';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AxiosHeaders } from 'axios';
import Swal from 'sweetalert2';

const img_hosting_token = import.meta.env.VITE_Image_Upload_Token
console.log(img_hosting_token);

const AddItem = () => {
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
                    const { name, recipe, category, price } = data;
                    const newItem = { name, price: parseFloat(price), category, recipe, image: imgUrl }
                    console.log(newItem);
                    axiosSecure.post('/menu', newItem)
                        .then(data => {
                            console.log('after posting menu item', data.data);
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'Item Added Successfully',
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
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Name*</span>
                    </label>
                    <input type="text" placeholder="Recipe Name" {...register("name", { required: true, maxLength: 120 })} className="input input-bordered w-full" />
                </div>
                <div className="flex justify-between py-3">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Category*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-bordered">
                            <option disabled >Pick One</option>
                            <option>salad</option>
                            <option>pizza</option>
                            <option>soup</option>
                            <option>dessert</option>
                            <option>drinks</option>
                        </select>
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input {...register("price", { required: true })} type="number" placeholder="Type here" className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Recipe Details*</span>

                    </label>
                    <textarea {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>

                </div>
                <div className="form-control w-full max-w-sm py-3">
                    <label className="label">
                        <span className="label-text">Item Image</span>
                    </label>
                    <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-sm" />
                </div>
                <input className='btn btn-md px-9 btn-neutral mt-4' type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem; 
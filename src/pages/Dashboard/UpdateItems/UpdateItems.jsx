import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useMenu from '../../../hooks/useMenu';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const img_hosting_token = import.meta.env.VITE_Image_Upload_Token
console.log(img_hosting_token);

const UpdateItems = () => {
    const { id } = useParams();
    const [menu, , refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, setValue } = useForm();
    const currentItem = menu.find(item => item._id === id);

    // New state to hold the selected image file
    const [selectedImage, setSelectedImage] = useState(null);

    // Function to handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    useEffect(() => {
        if (currentItem) {
            setValue('name', currentItem.name);
            setValue('price', currentItem.price);
            setValue('category', currentItem.category);
            setValue('recipe', currentItem.recipe);
            setValue('image', currentItem.image);
        }
    }, [menu, id, setValue]);

    const onSubmit = async (formData) => {
        try {
            const updatedData = { ...formData };
            if (selectedImage) {
                const imageUrl = await uploadImageToImageBB(selectedImage);
                updatedData.image = imageUrl;
            }

            await axiosSecure.put(`/menu/${id}`, updatedData);
            Swal.fire('Success', 'Item updated successfully!', 'success');

            reset();
            refetch();
        } catch (error) {
            console.error('Error updating item:', error);
            Swal.fire('Error', 'Failed to update item. Please try again later.', 'error');
        }
    };
    const uploadImageToImageBB = async (imageFile) => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    key: img_hosting_token, // Replace 'img_hosting_token' with your ImageBB API key
                },
            });

            return response.data.data.url;
        } catch (error) {
            console.error('Error uploading image to ImageBB:', error);
            throw error;
        }
    };
    if (!menu) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full px-8 py-9 bg-slate-100 border'>
            <h2>update item</h2>
            {/* <SectionTitle subHeading="What's New" heading="Add An Item"></SectionTitle> */}
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
                    {/* <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-sm" /> */}
                    <input {...register("image", { required: true })} type="file" onChange={handleImageChange} />
                    {currentItem && currentItem.image && (
                        <div>
                            <img src={currentItem.image} alt="Current Item Image" style={{ maxWidth: '200px' }} />
                        </div>
                    )}
                </div>
                <input className='btn btn-md px-9 btn-neutral mt-4' type="submit" value="Update Item" />
            </form>
        </div>
    );

};

export default UpdateItems;
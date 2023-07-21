import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import usePasswordToggle from '../../hooks/usePasswordToggle';
import ImageUpload from '../../CommonComponents/ImageUpload/ImageUpload';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
// import './SignUp.css'

const SignUp = () => {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { createUser, updateUserProfile } = useContext(AuthContext)

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email }
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Your Profile has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };
    console.log(watch("example"))

    return (
        <>
            <Helmet>
                <title>Chef Table | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up Here!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-100 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name='name' placeholder="type your name" className="input input-bordered" />
                                {errors.name && <span className='text-red-600'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" {...register("PhotoURL", { required: true })} placeholder="Photo Url " className="input input-bordered" />
                                {errors.PhotoURL && <span className='text-red-600'>This field is required</span>}
                            </div>
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Upload Your Image</span>
                                </label>
                                <ImageUpload {...register("PhotoURL", { required: true })}></ImageUpload>
                                {errors.PhotoURL && <span className='text-red-600'>This field is required</span>}
                            </div> */}

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-600'>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input-group">
                                    <input type={PasswordInputType} {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 14,
                                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                    })
                                    } name='password' placeholder="password" className="input input-bordered" />
                                    <span className="password-toogle-icon bg-base-200">
                                        {ToggleIcon}
                                    </span>
                                </label>
                                {errors.password?.type === 'required' && <span className='text-red-600'>This field is required</span>}
                                {errors.password?.type === 'minLength' && <span className='text-red-600'>Password must be 6 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-600'>Password must be less than 14 characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-600'>Password must one uppercase, one lowercase, one number and one special character</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>

                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                            <p><small>Already registerd? <Link to='/login'>sign in</Link></small></p>
                            <SocialLogin></SocialLogin>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
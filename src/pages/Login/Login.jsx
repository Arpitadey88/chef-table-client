import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import usePasswordToggle from '../../hooks/usePasswordToggle';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const [PasswordInputType, ToggleIcon] = usePasswordToggle();
    const [disabled, setDisabled] = useState(true);
    const [check, setCheck] = useState(false);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Successfully Signed in',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate(from, { replace: true });
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;

        if (validateCaptcha(user_captcha_value) == true) {
            setCheck(user_captcha_value);
            setDisabled(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>Chef Table | Sign In</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-100 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <label className="input-group border rounded-lg">
                                    <input type={PasswordInputType} name="password" placeholder="password" className="input " />
                                    <span className="bg-base-200">
                                        {ToggleIcon}
                                    </span>
                                </label>

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="type captcha" className="input input-bordered" />
                                <div className='mt-5'>
                                    {/* <button onClick={handleValidateCaptcha} className="btn btn-outline rounded-sm btn-xs"><FontAwesomeIcon icon="fa-solid fa-check" />
                                    </button> */}
                                    <input errormessages="This field is required" readOnly
                                        checked={check}
                                        value={check} type="checkbox" className="checkbox rounded-sm" />
                                </div>
                            </div>
                            {/* TODO: make button disable after complete project => disabled={disabled}*/}
                            <div className="form-control mt-3">
                                <input disabled={false} className="btn btn-primary" type="submit" value="Sign In" />
                            </div>
                            <p><small>New here? <Link className='text-primary' to='/signup'>create a new account?</Link></small></p>
                            <SocialLogin></SocialLogin>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
};
library.add(faCheck);
export default Login;
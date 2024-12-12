import { Card, Container, FormControl, FormLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthService from "../../app/services/auth.service";
import { useAuth } from "../../app/utils/auth";

export default function Register() {

    interface FormProps {
        name: string
        email: string
        password: string
        password_confirmation: string
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormProps>()

    const authService = useAuthService();

    const auth = useAuth();

    const navigate = useNavigate();

    function submit(data: FormProps) {
        authService.register(data).then((response) => {
            if (response.access_token) {

                auth.login(response.access_token, {
                    id: response.id,
                    email: response.email,
                    name: response.name
                }, () => {
                    navigate('/')
                })
            }
        })
    }

    const password = watch('password'); // Watch password field for confirmation validation

    return <>
        <header
            className="masthead"
            style={{ backgroundImage: "url('/assets/img/register-bg.jpg')" }}
        >
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="page-heading">
                            <h1>Register</h1>
                            <span className="subheading">Start Contributing to the Blog!</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div className="content">

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <form onSubmit={handleSubmit(submit)}>

                            <div className="mb-3">
                                <FormLabel>Name</FormLabel>
                                <FormControl
                                    {...register('name', { required: 'Please Enter Name' })}
                                />
                                {errors.name && <em className="text-danger small">{errors.name.message}</em>}
                            </div>

                            <div className="mb-3">
                                <FormLabel>Email</FormLabel>
                                <FormControl
                                    {...register('email', {
                                        required: 'Please Enter Email',
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Please Enter a Valid Email'
                                        }
                                    })}
                                />
                                {errors.email && <em className="text-danger small">{errors.email.message}</em>}
                            </div>

                            <div className="mb-3">
                                <FormLabel>Password</FormLabel>
                                <FormControl
                                    {...register('password', {
                                        required: 'Please Enter Password',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters'
                                        }
                                    })}
                                    type="password"
                                />
                                {errors.password && <em className="text-danger small">{errors.password.message}</em>}
                            </div>

                            <div className="mb-3">
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl
                                    {...register('password_confirmation', {
                                        required: 'Confirm the Password',
                                        validate: value => value === password || 'Passwords do not match'
                                    })}
                                    type="password"
                                />
                                {errors.password_confirmation && <em className="text-danger small">{errors.password_confirmation.message}</em>}
                            </div>

                            <div className="mt-5">
                                <button className="btn btn-primary ">Sign Me Up!</button>

                                {/* <div className="mt-2 small text-center">
                                    <div className="small">
                                        Already Registered !!! Try <Link to="/login">Login</Link>
                                    </div>
                                </div> */}

                            </div>
                        </form>


                    </div>

                </div>
            </div>
        </div>
    </>
}
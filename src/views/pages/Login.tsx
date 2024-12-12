import { Card, Container, FormControl, FormLabel } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import useAuthService from "../../app/services/auth.service";
import { useAuth } from "../../app/utils/auth";

export default function Login() {

    interface FormProps {
        email: string
        password: string
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormProps>();

    const authService = useAuthService();

    const auth = useAuth();

    const navigate = useNavigate();

    function submit(data: FormProps) {
        authService.login(data.email, data.password).then((response) => {
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

    return <>

        <header
            className="masthead"
            style={{ backgroundImage: "url('/assets/img/login-bg.jpg')" }}
        >
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="page-heading">
                            <h1>Log In</h1>
                            <span className="subheading">Welcome Back!</span>
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
                                <FormLabel>Email</FormLabel>
                                <FormControl {...register('email', { required: 'Please Enter Email'})} />
                                {errors && <em className="text-danger small">{errors.email?.message}</em>}
                            </div>
                            <div className="mb-3">
                                <FormLabel>Password</FormLabel>
                                <FormControl {...register('password', { required: 'Please Enter Password'})} type="password" />
                                {errors && <em className="text-danger small">{errors.password?.message}</em>}
                            </div>

                            <div className="mt-5">
                                <button className="btn btn-primary">Let Me In!</button>

                                {/* <div className="mt-2 small text-center">
                                    <div className="small">
                                        New Here !!! You can click here <Link to="/register">Register</Link>
                                    </div>
                                </div> */}

                            </div>
                        </form>


                    </div>
                </div>
            </div>

        </div >
    </>
}
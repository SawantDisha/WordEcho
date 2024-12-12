import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";

export default function Contact() {

    interface FormProps {
        name: string
        email: string
        phone: string
        message: string
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormProps>();

    const onSubmit = (data: FormProps) => {
        // https://www.emailjs.com/
        // Send email via EmailJS
        emailjs
            .send(
                "service_jh5nvyi", // Replace with your EmailJS service ID
                "template_spae1e5", // Replace with your EmailJS template ID
                {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    message: data.message,
                },
                "C-4BZbBTlTE_YiQWC" // Replace with your EmailJS user ID
            )
            .then(
                (response: any) => {
                    console.log("SUCCESS!", response.status, response.text);
                    alert("Message sent successfully!");
                    reset(); // Reset the form after successful submission
                },
                (error: any) => {
                    console.log("FAILED...", error);
                    alert("Failed to send message. Please try again.");
                }
            );
    };


    return <>

        <header
            className="masthead"
            style={{ backgroundImage: "url('/assets/img/contact-bg.jpg')" }}
        >
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="page-heading">
                            <h1>Contact Me</h1>
                            <span className="subheading">Have questions? I have answers.</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div className="content">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <p>
                            Want to get in touch? Fill out the form below to send me a message and
                            I will get back to you as soon as possible!
                        </p>
                        <div className="my-5">
                            {/* <!-- * * * * * * * * * * * * * * *--> */}
                            {/* <!-- * * Simplified SB Contact Form for the Tutorial* *--> */}
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-floating">
                                    <input
                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        id="name"
                                        placeholder="Enter your name"
                                        {...register("name", { required: "Name is required" })}
                                    />
                                    <label htmlFor="name">Name</label>
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name.message}</div>
                                    )}
                                </div>

                                <div className="form-floating">
                                    <input
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    <label htmlFor="email">Email</label>
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email.message}</div>
                                    )}
                                </div>

                                <div className="form-floating">
                                    <input
                                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        {...register("phone", { required: "Phone number is required" })}
                                    />
                                    <label htmlFor="phone">Phone</label>
                                    {errors.phone && (
                                        <div className="invalid-feedback">{errors.phone.message}</div>
                                    )}
                                </div>

                                <div className="form-floating">
                                    <textarea
                                        className={`form-control ${errors.message ? "is-invalid" : ""
                                            }`}
                                        id="message"
                                        placeholder="Enter your message"
                                        style={{ height: "12rem" }}
                                        {...register("message", {
                                            required: "Message is required",
                                        })}
                                    ></textarea>
                                    <label htmlFor="message">Message</label>
                                    {errors.message && (
                                        <div className="invalid-feedback">{errors.message.message}</div>
                                    )}
                                </div>

                                <br />
                                <button className="btn btn-danger text-uppercase" type="submit">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
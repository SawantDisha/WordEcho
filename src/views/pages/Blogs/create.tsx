import { Card, Container, FormControl, FormLabel } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { IBlog } from "../../../app/types/blog.type";
import useBlogService from "../../../app/services/blog.service";
// import { Editor, EditorState } from 'draft-js'
import ReactQuill from "react-quill";

export default function CreateBlog() {


    const { register, control, setValue, formState: { errors }, handleSubmit } = useForm<IBlog>({
        defaultValues: {
            date: new Date().toISOString().split('T')[0]
        }
    });

    const blogService = useBlogService();

    const navigate = useNavigate();

    function submit(data: IBlog) {

        blogService.createOne(data).then((response) => {
            if (response.data) {
                navigate('/')
            }
        })
    }

    return <>
        <header
            className="masthead"
            style={{ backgroundImage: "url('/assets/img/edit-bg.jpg')" }}
        >
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="page-heading">
                            <h1>New Post</h1>
                            <span className="subheading">You're going to make a great blog post!</span>
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
                                <FormLabel>Title <span className="text-danger">*</span></FormLabel>
                                <FormControl {...register('title', { required: 'This Field is Required' })} placeholder="Enter Blog Title" />
                                {errors && <em className="text-danger small">{errors.title?.message}</em>}
                            </div>

                            <div className="mb-3">
                                <FormLabel>Sub Title <span className="text-danger">*</span></FormLabel>
                                <FormControl {...register('sub_title', { required: 'This Field is Required' })} placeholder="Enter Blog Sub Title" />
                                {errors && <em className="text-danger small">{errors.sub_title?.message}</em>}
                            </div>

                            <div className="pb-5">
                                <FormLabel>Content <span className="text-danger">*</span></FormLabel>
                                <Controller
                                    control={control}
                                    rules={{
                                        required: 'This Field is Required'
                                    }}
                                    name={'content'}
                                    render={({ field, fieldState, formState }) => {
                                        return <ReactQuill
                                            value={field.value}
                                            style={{
                                                height: 300
                                            }}
                                            onChange={(e) => {
                                                console.log(e)
                                                setValue('content', e)
                                            }}
                                            theme="snow"
                                            placeholder="Start typing..."
                                        />
                                    }}
                                />
                                {errors && <em className="text-danger small">{errors.content?.message}</em>}
                            </div>
                            <div className="mb-3">
                                <FormLabel>Date <span className="text-danger">*</span></FormLabel>
                                <FormControl type="date" {...register('date', { required: 'This Field is Required' })} />
                                {errors && <em className="text-danger small">{errors.date?.message}</em>}
                            </div>

                            <div className="mt-5">
                                <button className="btn btn-dark w-100">Create</button>

                            </div>
                        </form>



                    </div>
                </div>
            </div>
        </div>
    </>
}
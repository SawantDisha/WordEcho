import { Link, useParams } from "react-router"
import useViewRecord from "../../../app/hooks/view.hook"
import useBlogService from "../../../app/services/blog.service";
import { Card, Container } from "react-bootstrap";
import { IBlog } from "../../../app/types/blog.type";
import Visibility from "../../components/Visibility";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import { useAuth } from "../../../app/utils/auth";
import HTMLReactParser from "html-react-parser/lib/index";
import { useForm } from "react-hook-form";
import useCommentService from "../../../app/services/comment.service";
import useListRecord from "../../../app/hooks/list.hook";
import { IComment } from "../../../app/types/comment.type";

export default function ViewBlog() {

    const { id } = useParams();

    const blogService = useBlogService()

    const { loadRecord, loading, abortLoadRecord, record: blog } = useViewRecord<IBlog>({ service: blogService })

    const auth = useAuth();

    useEffect(() => {
        if (id) {
            loadRecord(id, {})
        }
    }, [id])

    return <>

        <header className="masthead" style={{ height: 300, backgroundImage: "url('/assets/img/edit-bg.jpg')" }}>
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="post-heading">
                            <h2>{blog?.title}</h2>
                            {/* <h6 className="subheading">{blog?.sub_title}</h6> */}
                            <span className="meta small"
                            >Posted by <a href="#">{blog?.author?.name ?? 'User'}</a> on {blog?.date ?? 'Today'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div className="content">


            <Visibility condition={!loading} fallback={<Loader />}>
                <Visibility condition={!!blog?.id} fallback={'Not Found'}>

                    <article>
                        <div className="container px-4 px-lg-5">
                            <div className="row gx-4 gx-lg-5 justify-content-center">
                                <div className="col-md-10 col-lg-8 col-xl-7">
                                    <h4 className="">{blog?.sub_title}</h4>

                                    {HTMLReactParser(blog?.content ?? '')}

                                    <Visibility condition={auth.user?.id == blog?.author_id}>

                                        <div className="d-flex justify-content-end mb-4">
                                            <Link
                                                className="btn btn-primary float-right"
                                                to={`/blogs/${id}/edit`}
                                            >Edit Post</Link>
                                        </div>
                                    </Visibility>

                                    <div className="">

                                        {id ? <>
                                            <ListComments blogId={id} />
                                        </>
                                            : <></>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>

                </Visibility>
            </Visibility>



        </div>
    </>
}

interface ListCommentsProps {
    blogId: string
}

function ListComments({ blogId }: ListCommentsProps) {

    const commentService = useCommentService();

    const { loadRecords, loading, records } = useListRecord<IComment>({ service: commentService });

    useEffect(() => {
        loadRecords({ filter: JSON.stringify({ blog_id: blogId }) });
    }, [])

    interface FormProps {
        blog_id: string
        content: string
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormProps>({
        defaultValues: {
            blog_id: blogId
        }
    });

    function submit(data: FormProps) {
        commentService.createOne(data).then((response) => {
            reset()
            loadRecords({ filter: JSON.stringify({ blog_id: blogId }) });
        })
    }

    function deleteComment(id?: string) {
        if (id && confirm('Are you sure you want to delete this comment')) {
            commentService.deleteOne(id).then((response) => {
                loadRecords({ filter: JSON.stringify({ blog_id: blogId }) })
            })
        }
    }

    const auth = useAuth();


    return <>
        <form onSubmit={handleSubmit(submit)}>
            <div className="d-flex">
                <input type="text" {...register('content')} className="form-control" placeholder="Add Comment" />
                <button className="btn btn-dark ms-2"><i className="fab fa-telegram"></i></button>
            </div>
        </form>

        <Visibility condition={!loading} fallback={<Loader />}>
            <Visibility condition={records?.length! > 0} fallback={<div className="mb-3">
                <div className="text-center py-3">No Comments Found</div>
            </div>}>
                <>
                    <div className="comment mb-3">
                        <ul className="commentList">
                            {records?.map((comment, index) => <div key={index}>
                                <li >
                                    <div className="commenterImage">
                                        <img src="/assets/img/default-profile.jpg" />

                                        {/* {auth.user?.id == comment.author_id &&
                                            <button onClick={() => deleteComment(comment.id)} className="btn btn-sm btn-outline-danger border-0"><i className="fa fa-trash"></i></button>
                                        } */}
                                    </div>
                                    <span className="sub-text">{comment?.author?.name ?? 'User'}</span>
                                    <div className="commentText mt-1">
                                        {comment.content}
                                    </div>
                                </li>
                            </div>)}
                        </ul>
                    </div>
                </>

            </Visibility>


        </Visibility>


    </>
}
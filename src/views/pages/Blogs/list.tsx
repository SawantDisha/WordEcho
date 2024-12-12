import { useEffect } from "react";
import useListRecord from "../../../app/hooks/list.hook";
import useBlogService from "../../../app/services/blog.service";
import { IBlog } from "../../../app/types/blog.type";
import { useAuth } from "../../../app/utils/auth"
import { Link } from "react-router";
import Loader from "../../components/Loader";
import Visibility from "../../components/Visibility";

export default function ListBlog() {


    const auth = useAuth();

    const blogService = useBlogService()

    const {
        records,
        loading,
        error,
        abortLoadRecords,
        count,
        loadRecords
    } = useListRecord<IBlog>({ service: blogService });

    useEffect(() => {
        loadRecords({
            filter: JSON.stringify({ author_id: auth.user?.id })
        });

        return () => {
            abortLoadRecords();
        }
    }, [])

    function deleteBlog(id?: string) {
        if (id && confirm('Are you sure you want to delete this blog')) {
            blogService.deleteOne(id).then((response) => {

                loadRecords({
                    filter: JSON.stringify({ author_id: auth.user?.id })
                })
            })
        }
    }

    return <>
        <header
            className="masthead"
            style={{ backgroundImage: "url('/assets/img/home-bg.jpg')" }}
        >
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>{auth.user?.name}'s Blog</h1>
                            <span className="subheading">A collection of random musings.</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">

                    <Visibility condition={!loading} fallback={<Loader />}>
                        <Visibility condition={!error} fallback={<div className="text-center">Error Failed to Load Blogs</div>}>
                            <Visibility condition={!!records?.length} fallback={<div className="py-5 text-center w-100">No Blogs Found</div>}>
                                {records?.map((blog, index) => <div key={index}>
                                    <div>
                                        <div className="post-preview">
                                            <Link to={`/blogs/${blog.id}`}>
                                                <h2 className="post-title">{blog?.title}</h2>
                                                <h3 className="post-subtitle">{blog?.sub_title}</h3>
                                            </Link>
                                            <p className="post-meta">
                                                Posted by <a href="#">{blog.author?.name ?? 'User'}</a> on {blog?.date ?? "Today"}

                                                <Visibility condition={auth.user?.id == blog.author_id}>
                                                    <a href="javascript:void" onClick={() => deleteBlog(blog.id)}>✘</a>
                                                </Visibility>
                                            </p>
                                        </div>
                                        {/* <!-- Divider--> */}
                                        <hr className="my-4" />
                                    </div>
                                </div>)}
                            </Visibility>
                        </Visibility>
                    </Visibility>

                    <Visibility condition={!!auth.user?.id}>
                        <div className="d-flex justify-content-end mb-4">
                            <Link className="btn btn-dark float-right" to="/blogs/create">Create New Post</Link>
                        </div>
                    </Visibility>
                </div>
            </div>
        </div>
    </>
}
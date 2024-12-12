import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { IBlog } from "../../app/types/blog.type";
import useBlogService from "../../app/services/blog.service";
import { IManyResponseDto } from "../../app/types/common.type";
import useListRecord from "../../app/hooks/list.hook";
import Visibility from "../components/Visibility";
import Loader from "../components/Loader";
import { Link } from "react-router";
import HTMLReactParser from "html-react-parser/lib/index";
import { useAuth } from "../../app/utils/auth";

export default function Home() {

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
        loadRecords({});

        return () => {
            abortLoadRecords();
        }
    }, [])

    const auth = useAuth();

    function deleteBlog(id?: string) {
        if (id && confirm('Are you sure you want to delete this blog')) {
            blogService.deleteOne(id).then((response) => {

                loadRecords({})
            })
        }
    }

    return <>


        {/* <header className="masthead text-center py-5" style={{
            background: 'no-repeat center center',
            backgroundColor: '#6c757d',
            backgroundSize: 'cover',
            backgroundAttachment: 'scroll',
            backgroundImage: 'url("/assets/img/home-bg.jpg")'
        }} >
            <Container >
                <div className="my-5">
                    <div className="mb-4">

                        <div className="display-1">Disha's Blog</div>
                        <div className="">A collection of random musings.</div>
                    </div>

                    <div className="">
                        <input className="form-control mx-auto rounded-pill mb-3" placeholder="Search For Blog ..." style={{ maxWidth: 500 }} />

                        <button className="btn btn-dark rounded-pill"><i className="fa fa-search"></i> Search</button>
                    </div>
                </div>
            </Container>
        </header> */}

        <header
            className="masthead"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/4818958/pexels-photo-4818958.jpeg?auto=compress&cs=tinysrgb&w=1200&lazy=load')" }}
        >
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="site-heading">
                            <h1>Word Echo</h1>
                            <span className="subheading">A collection of random musings.</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>


        {/* <div className="content">

            <div className="py-5">
                <Container>
                    <div className="h1">All Blogs</div>

                    <Row md={3}>
                        <Visibility condition={!loading} fallback={<Col><Loader /></Col>}>
                            <Visibility condition={!error} fallback={<Col>Error Failed to Load Blogs</Col>}>
                                <>
                                    {records?.length == 0 ? <>
                                        <div className="py-5 text-center w-100">No Blogs Found</div>
                                    </> : <>
                                        {records?.map((blog, index) => <Col key={index}>
                                            <Link to={`/blogs/${blog.id}`} className="text-decoration-none">
                                                <Card className="mb-3">
                                                    <Card.Header>{blog.title}</Card.Header>

                                                    <Card.Body>
                                                        {HTMLReactParser(blog.content)}
                                                    </Card.Body>
                                                </Card>
                                            </Link>
                                        </Col>)}
                                    </>}
                                </>
                            </Visibility>
                        </Visibility>
                    </Row>
                </Container>
            </div>
        </div> */}

        {/* <!-- Main Content--> */}
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
import { createBrowserRouter } from "react-router";
import Home from "../views/pages/Home";
import About from "../views/pages/About";
import Contact from "../views/pages/Contact";
import Login from "../views/pages/Login";
import Register from "../views/pages/Register";
import HomeLayout from "../views/layouts/HomeLayout";
import CreateBlog from "../views/pages/Blogs/create";
import ViewBlog from "../views/pages/Blogs/view";
import ListBlog from "../views/pages/Blogs/list";
import AuthMiddleware from "../app/middlewares/auth.middleware";
import EditBlog from "../views/pages/Blogs/edit";

const routes = createBrowserRouter([
    {
        path: '', element: <HomeLayout />, children: [
            { path: '', element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'contact', element: <Contact /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            {
                path: 'blogs', children: [
                    {
                        path: 'create', element: <AuthMiddleware><CreateBlog /></AuthMiddleware>
                    },
                    {
                        path: ':id', element: <ViewBlog />,
                    },
                    {
                        path: ':id/edit', element: <AuthMiddleware><EditBlog /></AuthMiddleware>
                    },

                ]
            },
            { path: 'my-blogs', element: <AuthMiddleware><ListBlog /></AuthMiddleware> },
        ]

    }
]);

export default routes;
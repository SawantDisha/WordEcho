import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import { useAuth } from "../../app/utils/auth";
import { useEffect, useState } from "react";

type Theme = 'auto' | 'light' | 'dark'

export default function HomeLayout() {

    const auth = useAuth();

    const navigate = useNavigate()

    function logout() {
        auth.logout(() => {
            navigate('/')
        })
    }

    const [theme, setTheme] = useState<Theme>(localStorage.getItem('theme') as Theme || 'light');

    useEffect(() => {
        applyTheme(theme);

        if (theme === 'auto') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = () => applyTheme('auto');
            mediaQuery.addEventListener('change', handleChange);

            return () => {
                mediaQuery.removeEventListener('change', handleChange);
            };
        }
    }, [theme]);

    const applyTheme = (theme: Theme) => {
        if (theme === 'auto') {
            document.documentElement.setAttribute(
                'data-bs-theme',
                window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            );
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }

        localStorage.setItem('theme', theme);
    };

    const getThemeIcon = (theme: Theme) => {
        const iconMapping = {
            'light': "fa fa-sun",
            'dark': "fa fa-moon",
            'auto': "fa-solid fa-circle-half-stroke",
        }

        return iconMapping[theme];
    }

    return <>

        {/* <Navbar  id="mainNav" collapseOnSelect expand="lg" className="navbar-dark" fixed="top"> */}
        <Navbar id="mainNav" collapseOnSelect className="navbar navbar-expand-lg" expand="lg">
            <Container className="px-4 px-lg-5">
                <Navbar.Brand as={Link} to={'/'}>Word Echo</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to={'/'}>Home</Nav.Link>
                        <Nav.Link as={NavLink} to={'/about'}>About</Nav.Link>
                        <Nav.Link as={NavLink} to={'/contact'}>Contact</Nav.Link>

                        {!!auth.user ? <>

                            <NavDropdown title={<span >Hello, {auth.user.name} </span>} >
                                {/* <NavDropdown.Item> <i className="fa fa-user"></i> My Profile</NavDropdown.Item>
                                <NavDropdown.Divider /> */}
                                <NavDropdown.Item as={Link} to={'/blogs/create'}><i className="fa fa-plus"></i> Create Post</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/my-blogs'}> <i className="fab fa-blogger"></i> My Blogs</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logout}>
                                    <i className="fa fa-sign-out"></i> Logout
                                </NavDropdown.Item>
                            </NavDropdown>


                        </> :

                            <>
                                <Nav.Link as={NavLink} to={'/login'}>Login</Nav.Link>
                                <Nav.Link as={NavLink} to={'/register'}>Register</Nav.Link>
                            </>
                        }

                        <NavDropdown bsPrefix="p-0 nav-link small mx-2" className={'p-0'} title={<i style={{height: 15, width: 20}} className={`small ${getThemeIcon(theme)}`}></i>} className="" align={'end'}>
                            <NavDropdown.Item onClick={() => setTheme('light')}><i style={{ width: 20 }} className="fa fa-sun"></i> Light</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTheme('dark')}><i style={{ width: 20 }} className="fa fa-moon"></i> Dark</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => setTheme('auto')} ><i style={{ width: 20 }} className="fa-solid fa-circle-half-stroke"></i> Auto</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>


        <main>
            <Outlet />
        </main>

        <footer className="border-top mt-3">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-twitter fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-facebook-f fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#!">
                                    <span className="fa-stack fa-lg">
                                        <i className="fas fa-circle fa-stack-2x"></i>
                                        <i className="fab fa-github fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div className="small text-center text-muted fst-italic">Copyright &copy; WordEcho 2024</div>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
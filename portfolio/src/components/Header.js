import { useState, useEffect } from 'react';
import { Outlet, Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import './styles/Header.css';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isHomePage, setIsHomePage] = useState(false);
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate hook for navigation

    useEffect(() => {
        // Check if the current location is the homepage
        setIsHomePage(location.pathname === '/');
    }, [location]);

    const handleNavbarBrandClick = () => {
        // Redirect the user based on whether they are on the homepage or not
        if (isHomePage) {
            navigate("/misc"); // Use navigate function for navigation
        } else {
            navigate("/");
        }
    };

    return (
        <>
            <nav sticky="top">
                <Link to="/" className="navbar-brand" style={{ color: isHomePage ? 'white' : 'black' }} onClick={handleNavbarBrandClick}>
                    Adarsh Anand
                </Link>
                <div className='menu' onClick={() => {
                    setMenuOpen(!menuOpen);
                }}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <ul className={menuOpen ? 'open' : ''}>
                    <li>
                        <NavLink to="/experience">Experience</NavLink>
                    </li>
                    <li>
                        <NavLink to="/projects">Projects</NavLink>
                    </li>
                    <li>
                        <NavLink to="/nontech">Not so Tech</NavLink>
                    </li>
                    <li>
                        <NavLink to="/bucketlist">Bucket List</NavLink>
                    </li>
                    <li>
                        <a href="https://drive.google.com/file/d/1HTeWRbZU8sduoOczPrKNB_iv5SXrlPpY/view?usp=sharing" target="_blank" rel="noreferrer">Resume</a>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}

export default Header;

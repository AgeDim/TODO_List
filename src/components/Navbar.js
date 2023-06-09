import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {MdClose} from 'react-icons/md';
import {FiMenu} from 'react-icons/fi';
import {ABOUT_APP_ROUTE, MAIN_ROUTE} from "../utils/consts";

const Navbar = () => {
    const links = [
        {
            id: 1,
            path: MAIN_ROUTE,
            text: 'Home',
        },
        {
            id: 2,
            path: ABOUT_APP_ROUTE,
            text: 'About',
        },
    ];

    const [navbarOpen, setNavbarOpen] = useState(false);

    const handleToggle = () => {
        setNavbarOpen((prev) => !prev);
    };

    const closeMenu = () => {
        setNavbarOpen(false);
    };

    return (
        <nav className="navBar">
            <button type="button" onClick={handleToggle}>
                {navbarOpen ? (
                    <MdClose style={{color: 'black', width: '40px', height: '40px'}}/>
                ) : (
                    <FiMenu style={{color: 'black', width: '40px', height: '40px'}}/>
                )}
            </button>
            <ul className={`menuNav ${navbarOpen ? ' showMenu' : ''}`}>
                {links.map((link) => (
                    <li key={link.id}>
                        <NavLink
                            style={{textDecoration: "none", color: "black"}}
                            to={link.path}
                            activeClassName="active-link"
                            onClick={() => closeMenu()}
                            exact
                        >
                            {link.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
export default Navbar;

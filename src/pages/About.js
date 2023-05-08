import React from 'react';
import {Link} from 'react-router-dom';
import {ABOUT_APP_ROUTE, ABOUT_AUTHOR_ROUTE} from "../utils/consts";
import Navbar from "../components/Navbar";

const About = () => {
    const url = window.location.pathname
    const aboutData = [
        {
            path: '/about/about-app',
            title: 'About the App',
            description:
                'Project for English class',
        },
        {
            path: '/about/about-author',
            title: 'About the Author',
            description:
                'From Anwar, Valera, Misha and Dasha',
        },
    ];
    const getTitle = () =>{
        const [currData] = aboutData.filter(data => data.path === url)
        return currData.title
    }
    const getDescription = () =>{
        const [currData] = aboutData.filter(data => data.path === url)
        return currData.description
    }
    return (
        <div className="about__content">
            <Navbar/>
            <ul className="about__list">
                <li>
                    <Link to={ABOUT_APP_ROUTE}>About App</Link>
                </li>
                <li>
                    <Link to={ABOUT_AUTHOR_ROUTE}>About Author</Link>
                </li>
            </ul>
            <div className="main__content">
                <h1>{getTitle()}</h1>
                <p>{getDescription()}</p>
            </div>
        </div>
    );
};
export default About;

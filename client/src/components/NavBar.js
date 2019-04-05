import React from 'react';
import { Link } from 'react-router-dom';
import * as Routes from '../constants/Routes';

const NavBar = () => {
    return (
        <ul>
            <li>
                <Link to={Routes.home}>Home</Link>
            </li>
            <li>
                <Link to={Routes.signin}>Sign In</Link>
            </li>
            <li>
                <Link to={Routes.signup}>Sign Up</Link>
            </li>
        </ul>
    )
};

export default NavBar;
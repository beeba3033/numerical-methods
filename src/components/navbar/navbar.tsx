import React from 'react';
import {  Link } from "react-router-dom";
const Navbar= () =>{
    return (
        <div>
            <h1>hello</h1>
            <li>
                <Link to="/Root-of-Equation">Bisection</Link>
            </li>
            <li>
                <Link to="/cats">Cats</Link>
            </li>
            <li>
                <Link to="/sheeps">Sheeps</Link>
            </li>
            <li>
                <Link to="/goats">Goats</Link>
            </li>
        </div>
    );
}
export default Navbar;
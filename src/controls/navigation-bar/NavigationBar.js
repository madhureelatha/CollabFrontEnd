import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavigationBar extends Component {
    render() {
        return (
            <div className="nav-bar">
                <Link className="logo-text" to="/">COLLAB</Link>
                {/* <Link className="nav-element" to='/login'>LOGIN</Link>
                <Link className="nav-element" to='/register'>CREATE</Link> */}
            </div>
        )
    }
}
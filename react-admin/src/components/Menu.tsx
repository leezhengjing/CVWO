import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3 sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        {/* NavLink assigns a class to the HTML element when at that route, for this case is active */}
                        <NavLink to={'/'} className="nav-link">
                            Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/threads'} className="nav-link">
                            Threads
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/users'} className="nav-link">
                            Users
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/roles'} className="nav-link">
                            Roles
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/posts'} className="nav-link">
                            Posts
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav >
    )
}

export default Menu;
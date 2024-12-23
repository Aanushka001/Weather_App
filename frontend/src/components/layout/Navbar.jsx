import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/NavBar.css';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    WeatherApp
                </Link>
                <div className="navbar-right">
                    {user ? (
                        <>
                            <Link to="/profile" className="profile-btn">
                                {user.username}
                            </Link>
                            <button onClick={logout} className="sign-out-btn">
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="sign-in-btn">Sign In</Link>
                            <Link to="/signup" className="sign-up-btn">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

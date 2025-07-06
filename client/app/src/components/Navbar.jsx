import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaTachometerAlt, FaAccusoft, FaCalendarAlt, FaCanadianMapleLeaf, FaUser, FaUserAlt, FaUserCircle } from 'react-icons/fa';


import Modal from 'react-modal'
import BookAppointment from './BookAppointment';
import { Link } from 'react-router';


Modal.setAppElement('#root');

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <Link to="/">HealthPlus</Link>
                </div>

                <div className="menu-icon" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contact" className="nav-link">Contact Us</Link>
                    </li>
                    <li className="nav-item">
                        <button className="appointment-btn" onClick={() => setIsOpen(true)}>
                            <FaCalendarAlt className="btn-icon" /> Book Appointment
                        </button>
                    </li>

                    <li className="nav-item profile-item">
                        <div className="profile-menu" onClick={toggleProfile}>
                            <FaUserCircle className="profile-icon" />
                            <span>Profile</span>
                            {isProfileOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        {isProfileOpen && (
                            <ul className="profile-dropdown">
                                <li>
                                    <Link to="/dashboard" className="dropdown-link">
                                        <FaTachometerAlt className="dropdown-icon" /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/profile" className="dropdown-link">My Profile</Link>
                                </li>
                                <li>
                                    <Link to="/appointments" className="dropdown-link">My Appointments</Link>
                                </li>
                                <li>
                                    <Link to="/logout" className="dropdown-link">Logout</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                </ul>
            </div>
            <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
                <BookAppointment />
            </Modal>
        </nav>
    );
};

export default Navbar;
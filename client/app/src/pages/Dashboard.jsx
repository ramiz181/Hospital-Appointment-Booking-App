import React, { useEffect, useState } from 'react';
import {
    FaTachometerAlt,
    FaCalendarAlt,
    FaCheckCircle,
    FaClock,
    FaSearch,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';

import axios from 'axios'

import './../styles/DashboardStyling.css'


const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Sample data
    const bookedAppointments = [
        {
            id: 1,
            patientName: 'John Doe',
            doctor: 'Dr. Sarah Johnson',
            date: '2023-06-15',
            time: '10:00 AM',
            status: 'confirmed',
            reason: 'Annual checkup'
        },
        {
            id: 2,
            patientName: 'Jane Smith',
            doctor: 'Dr. Michael Chen',
            date: '2023-06-16',
            time: '02:30 PM',
            status: 'confirmed',
            reason: 'Headache consultation'
        },
        {
            id: 3,
            patientName: 'Robert Wilson',
            doctor: 'Dr. Emily Wilson',
            date: '2023-06-17',
            time: '11:00 AM',
            status: 'confirmed',
            reason: 'Pediatric visit'
        }
    ];

    const pendingAppointments = [
        // {
        //     id: 4,
        //     patientName: 'Alice Johnson',
        //     doctor: 'Dr. Robert Davis',
        //     date: '2023-06-18',
        //     time: '09:00 AM',
        //     status: 'pending',
        //     reason: 'Skin allergy'
        // },
        // {
        //     id: 5,
        //     patientName: 'David Brown',
        //     doctor: 'Dr. Lisa Thompson',
        //     date: '2023-06-18',
        //     time: '03:00 PM',
        //     status: 'pending',
        //     reason: 'General consultation'
        // }
    ];

    const [bookingformdata, setBookingformdata] = useState([]);

    const filteredPending = pendingAppointments.filter(appt =>
        appt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appt.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get('http://localhost:5000/getData')

                setBookingformdata(response.data || [])


            } catch (error) {
                console.error('API Error:', error, 'ye error tha yhan tk');
            }
        }
        fetchData()
    }, [])

    const handleStatusChange = async (eventID, newStatus) => {


        try {

            let response = await fetch(`http://localhost:5000/api/appointments/${eventID}`, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ status: newStatus })
            })

            console.log(response.status);

            if (!response.ok) {
                // Try to get error message from response
                const errorData = await response.text();
                console.error("Server error response:", errorData);
                throw new Error(`Server responded with ${response.status}`);
            }
            const updatedAppointment = await response.json();

            setBookingformdata(prevData =>
                prevData.map(appt =>
                    appt._id === updatedAppointment._id ? updatedAppointment : appt
                )
            )

            return true; // Success

        }
        catch (error) {
            console.log(error.message)
            return false;
        }

    }


    return (
        <div className="admin-dashboard">

            {/* Left Menu Panel */}
            <div className={`side-menu ${isMenuCollapsed ? 'collapsed' : ''}`}>
                <div className="menu-header">
                    <h3>Admin Panel</h3>
                    <button
                        className="collapse-btn"
                        onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
                    >
                        {isMenuCollapsed ? <FaChevronDown /> : <FaChevronUp />}
                    </button>
                </div>

                <ul className="menu-items">
                    <li
                        className={activeTab === 'dashboard' ? 'active' : ''}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <FaTachometerAlt className="menu-icon" />
                        {!isMenuCollapsed && <span>Dashboard</span>}
                    </li>
                    <li
                        className={activeTab === 'events' ? 'active' : ''}
                        onClick={() => setActiveTab('events')}
                    >
                        <FaCalendarAlt className="menu-icon" />
                        {!isMenuCollapsed && <span>Upcoming Events</span>}
                    </li>
                </ul>
            </div>

            {/* Main Content Area - Now with proper 100% width */}
            <div className="main-content">

                {/* Search bar */}
                <div className="content-header" style={{ width: '100%' }}>
                    <h2>Dashboard</h2>
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Stats Cards - Full width row */}
                <div className="stats-container" style={{ width: '100%' }}>
                    <div className="stat-card">
                        <h3>Total Appointments</h3>
                        <p>{bookedAppointments.length + pendingAppointments.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Confirmed</h3>
                        <p>{bookedAppointments.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Pending Approval</h3>
                        <p>{pendingAppointments.length}</p>
                    </div>
                </div>

                {/* Appointment Sections - Full width below stats */}
                <div className="appointment-section" style={{ width: '100%' }}>
                    <div className="section-header">
                        <FaCheckCircle className="section-icon" />
                        <h3>New Appointments to Approve</h3>
                    </div>

                    <div className="appointment-table">

                        {/* <div className='table-header'>
                            <span>Full Name</span>
                            <span>Phone</span>
                            <span>Doctor</span>
                            <span>Date & Time</span>
                            <span>Status</span>
                            <span>Status</span>
                        </div> */}

                        <div className="table-header">
                            <div style={{ width: '100%' }}>Full Name</div>
                            <div style={{ width: '100%' }}>Phone</div>
                            <div style={{ width: '100%' }}>Doctor</div>
                            <div style={{ width: '100%' }}>Date & Time</div>
                            <div style={{ width: '100%' }}>Status</div>
                            <div style={{ width: '100%' }}>Action</div>
                        </div>

                        {
                            bookingformdata.length > 0 ? (
                                bookingformdata.map(appt => (
                                    <div className="table-row" key={appt._id} style={{ width: '100%' }}>


                                        <div className="patient-cell appt-table-rows-data" style={{ width: '100%' }}> {appt.name}</div>

                                        <div className='appt-table-rows-data' style={{ width: '100%' }}>{appt.phone}</div>
                                        <div className='appt-table-rows-data' style={{ width: '100%' }}>{appt.doctor}</div>
                                        <div className='appt-table-rows-data' style={{ width: '100%' }}>

                                            <div>{new Date(appt.date).toLocaleDateString('en-GB')} <br /><span className='time'> {appt.time}</span></div>
                                            {/* <div className=""></div> */}
                                        </div>
                                        <div className="actions-main appt-table-rows-data" style={{ width: '100%' }}>
                                            <span className="action-status">
                                                {appt.status}
                                            </span>
                                        </div>
                                        <div className="actions appt-table-rows-data" style={{ width: '100%' }}>

                                            <select
                                                id={`status-${appt._id}`}
                                                value={appt.status}
                                                onChange={(e) => handleStatusChange(appt._id, e.target.value)}>
                                                <option value="approved">Approve</option>
                                                <option value="rejected">Reject</option>
                                            </select>

                                            {/* <button className="action-btn view">View</button>
                                            <button className="action-btn cancel">Cancel</button> */}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="no-results">No booked appointments found</div>
                            )}

                    </div>
                </div>

                {/* Pending Appointments Section */}
                <div className="appointment-section" style={{ width: '100%' }}>
                    <div className="section-header">
                        <FaClock className="section-icon" />
                        <h3>Booked Appointments</h3>
                    </div>


                    {filteredPending.length > 0 ? (
                        <div className="appointment-table">
                            <div className="table-header">
                                <div>Patient</div>
                                <div>Doctor</div>
                                <div>Date & Time</div>
                                <div>Reason</div>
                                <div>Actions</div>
                            </div>

                            {filteredPending.map(appt => (
                                <div className="table-row" key={appt.id}>
                                    <div className="patient-cell">
                                        <div className="patient-name">{appt.patientName}</div>
                                    </div>
                                    <div>{appt.doctor}</div>
                                    <div>
                                        <div>{appt.date}</div>
                                        <div className="time">{appt.time}</div>
                                    </div>
                                    <div>{appt.reason}</div>
                                    <div className="actions">
                                        <button className="action-btn approve">Approve</button>
                                        <button className="action-btn reject">Reject</button>
                                        <button className="action-btn view">View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">No pending appointments found</div>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
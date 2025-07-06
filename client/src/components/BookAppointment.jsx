import '../styles/appointment-form.css'

import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaStethoscope, FaPhone, FaPhoneAlt } from 'react-icons/fa';

const BookAppointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        doctor: '',
        date: '',
        time: '',
        reason: '',
        status: 'Pending',
        // agreeTerms: false
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const doctors = [
        { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiology' },
        { id: '2', name: 'Dr. Michael Chen', specialty: 'Neurology' },
        { id: '3', name: 'Dr. Emily Wilson', specialty: 'Pediatrics' },
        { id: '4', name: 'Dr. Robert Davis', specialty: 'Dermatology' },
        { id: '5', name: 'Dr. Lisa Thompson', specialty: 'General Medicine' },
    ];

    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            // [name]: type === 'checkbox' ? checked : value
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.phone) newErrors.phone = 'Phone is required';
        if (!formData.doctor) newErrors.doctor = 'Please select a doctor';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.time) newErrors.time = 'Time is required';
        if (!formData.reason) newErrors.reason = 'Please describe your reason';
        if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            date: new Date(formData.date) // Convert to Date object
        };

        // Send `payload` instead of `data`



        // if (validate()) {

        try {

            console.log(formData);

            const response = await fetch('http://localhost:5000/api/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                // credentials: 'include', // If using cookies/auth
            });

            if (response.ok) {
                const result = await response.json();
                setIsSuccess(true);
                console.log('Success:', result);

            } else {
                setIsSuccess(false);
                console.error('Server error');
            }

        } catch (err) {
            console.error('Network error:', err);
        }
        // }

    };

    // Get current date in YYYY-MM-DD format for min date attribute
    const today = new Date().toISOString().split('T')[0];

    return (

        // <section className="book-appointment-section">
        //     </section>
        <div className="appointment-container">
            {/* <p className="subtitle">Fill out the form below to schedule your visit</p> */}



            <form onSubmit={handleSubmit} className="appointment-form">
                <h2 className='book-title'>Book an Appointment</h2>

                {/*  Full name */}

                <div className="form-group">
                    <label htmlFor="name">
                        <FaUser className="input-icon" /> Full Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                {/* Email and phone */}

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">
                            <FaEnvelope className="input-icon" />Email *
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">
                            <FaPhoneAlt className="input-icon" />Phone Number *
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(123) 456-7890"
                            className={errors.phone ? 'error' : ''}
                        />
                        {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                </div>

                {/* Doctors */}

                <div className="form-group">
                    <label htmlFor="doctor">
                        <FaStethoscope className="input-icon" /> Select Doctor *
                    </label>
                    <select
                        id="doctor"
                        name="doctor"
                        value={formData.doctor}
                        onChange={handleChange}
                        className={errors.doctor ? 'error' : ''}
                    >
                        <option value="">-- Select a Doctor --</option>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.name + " " + doctor.specialty}>
                                {doctor.name} ({doctor.specialty})
                            </option>
                        ))}
                    </select>
                    {errors.doctor && <span className="error-message">{errors.doctor}</span>}
                </div>

                {/* Date and time slots */}

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">
                            <FaCalendarAlt className="input-icon" /> Date *
                        </label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={today}
                            className={errors.date ? 'error' : ''}
                        />
                        {errors.date && <span className="error-message">{errors.date}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">
                            <FaClock className="input-icon" /> Time Slot *
                        </label>
                        <select
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            className={errors.time ? 'error' : ''}
                        >
                            <option value="">-- Select Time --</option>
                            {timeSlots.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                        {errors.time && <span className="error-message">{errors.time}</span>}
                    </div>
                </div>

                {/* Reason for visit */}

                <div className="form-group">
                    <label htmlFor="reason">Reason for Visit *</label>
                    <textarea
                        id="reason"
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        placeholder="Describe your symptoms or reason for appointment"
                        rows="4"
                        className={errors.reason ? 'error' : ''}
                    ></textarea>
                    {errors.reason && <span className="error-message">{errors.reason}</span>}
                </div>

                {/* Privacy policy */}

                {/* <div className="form-group checkbox-group">
                    <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className={errors.agreeTerms ? 'error' : ''}
                    />
                    <label htmlFor="agreeTerms">
                        I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a> *
                    </label>
                    {errors.agreeTerms && <span className="error-message">{errors.agreeTerms}</span>}
                </div> */}

                {isSuccess && (
                    <div className="success-message">
                        <p>Your appointment has been booked successfully and is waiting for approval.</p>
                    </div>
                )}
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Booking...' : 'Book Appointment'}
                </button>
            </form>
        </div>

    );
};

export default BookAppointment;
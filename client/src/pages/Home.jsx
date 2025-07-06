import React from 'react';

import Navbar from '../components/Navbar';

import '../App.css';
import HeroSection from '../components/HeroSection';

import Testimonials from '../components/Testimonials';
import Specialties from '../components/Specialties';
import DoctorsList from '../components/DoctorsList';




export default function Home() {
    return (
        <div className="app">

            <div className="full-width">
                {/* <Navbar /> */}
                <HeroSection />
                <Specialties />
                <DoctorsList />
                {/* <DoctorsCategory /> */}
                {/* <DoctorSection /> */}
                {/* <Header /> */}
            </div>

            <div className="section-container">
                {/* <AppreciationCards /> */}
                <Testimonials />
            </div>

            <div className="section-container">
                {/* <ContactForm /> */}
            </div>

            <div className="full-width">
                {/* <Footer /> */}
            </div>
        </div>
    )
}

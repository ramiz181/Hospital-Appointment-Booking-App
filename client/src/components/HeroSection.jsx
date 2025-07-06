import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import '../styles/HeroSection.css'


export default function HeroSection() {
    return (
        <React.Fragment>
            <section className="container" id='Home'>
                <div className="container" id='home-container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 hero-title-div'>
                            <p className='hero-title'>
                                Book Appointment With Trusted Doctors
                            </p>
                            <div className='group-img'>
                                <img src='/images/group_profiles.png' alt='goup img' />
                                <p>Simply browse through our extensive list of trusted doctors,schedule your appointment hassle-free.</p>
                            </div>
                            {/* <a href='/home' className='rounded-pill appt-btn'> */}
                            <a href='/home' className='rounded-pill appt-btn'>
                                Book appointment <span><FaArrowRight /></span>

                            </a>
                        </div>
                        <div className='col-12 col-md-6 hero-img'>
                            <img src='/images/header_img.70253f4e7d8c989e6e15.png' alt='heroimage' className='img-fluid' />
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

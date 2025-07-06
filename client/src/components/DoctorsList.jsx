import React from 'react'
import '../styles/DoctorsList.css'
import '../styles/Specialties.css'
import { doctors } from '../Data';
import { Link } from 'react-router';

export default function DoctorsList() {
    return (
        <div>
            <section className="container-fluid" id='top-doctors' >
                <div className='container'>
                    <div className="specialitymenu-title">
                        <h1 className='title-menu'>Top <span>Doctors</span> to Book</h1>
                        <p>Simply browse through our extensive list of trusted doctors..</p>
                    </div>
                    <div className="row" id="doctor-card-container">
                        {
                            doctors.slice(0, 4).map((item, index) => {
                                return (
                                    <div key={index} className="col-12 col-md-5 col-lg-3" id="doctor-card">
                                        <img src={item.image} alt="doc-img" className="img-fluid" />
                                        <div className="doctor-info">
                                            <div className="available">
                                                <p></p><p>Available</p>
                                            </div>
                                            <p className="doctor-name">{item.name}</p>
                                            <p className="doctor-speciality">{item.speciality}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <br /><br /><br />
                    {/* <div className="more-btn">
                        <Link to="/AllDoctors" className="btn rounded-pill">
                            <button className="btn rounded-pill">More</button>
                        </Link>
                    </div> */}
                </div>
            </section>
        </div>
    )
}

import React from 'react'
import './../styles/Footer.css'

export default function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <section className="container-fluid" id='footer'>
            <div className="container" id='footer-container' >
                <div className="row footer-info">
                    <div className='col-12 col-md-5 footer-logo pe-5'>
                        <h1>HealthPlus</h1>
                        {/* <img src={logoimg} alt='logoimg' className='img-fluid' /> */}
                        <p>Providing trusted healthcare services with expert doctors and easy online appointment booking. Your health, our priority — anytime, anywhere.</p>
                    </div>
                    <div className='col-12 col-md-3 company'>
                        <p className='fs-5 fw-semibold'>COMPANY</p>
                        <ul className="p-0">
                            <li>Home</li>
                            <li>About us</li>
                            <li>Delivery</li>
                            <li>Privacy policy</li>
                        </ul>
                    </div>
                    <div className='col-12 col-md-3 touch'>
                        <p className="fs-5 fw-semibold">GET IN TOUCH</p>
                        <ul className="flex flex-col gap-2 p-0">
                            <li>+92312-0022022</li>
                            <li>ramizmalik18121@gmail.com</li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    <hr />
                    <p className="py-2 text-sm text-center">Copyright {currentYear} <a className='fw-semibold link-underline link-underline-opacity-0' href='https://ramnito.agency' target='_blank'>RAMNITO</a> - All Right Reserverd.
                    </p>
                </div>
            </div>
        </section>
    )
}

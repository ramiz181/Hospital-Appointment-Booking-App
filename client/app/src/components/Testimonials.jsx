import React from 'react'
import { FeedbackData } from '../Data'

export default function Testimonials() {
    return (
        <div className='container-fluid' id="reviews">
            <div className="mb-4 specialitymenu-title">
                <h1 className='title-menu'>Patients <span>Feedback</span></h1>
            </div>

            <div className="d-flex flex-wrap flex-column flex-md-row justify-content-center align-items-center gap-3">
                {FeedbackData.feedbacks.map((user, index) => (
                    <div key={index} className={`p-3 rounded-4 shadow-sm ${index % 2 !== 0 ? 'mb-md-5' : ''} review`}
                        style={{ maxWidth: '300px' }}>

                        <div className="d-flex gap-3 align-items-center">
                            <img
                                src={user.img}
                                alt={user.name}
                                className="rounded-circle"
                                style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                            />
                            <div>
                                <h6 className="fw-bold mb-0 small">{user.name}</h6>
                                <p className="text-muted mb-0 small">{user.role}</p>
                            </div>
                        </div>
                        <p className="mt-2 fs-6 small text-dark">{user.desc}</p>

                    </div>
                ))}
            </div>
        </div >

    )
}

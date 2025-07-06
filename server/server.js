// import mongoose from 'mongoose';

require('dotenv').config();


const express = require('express');
const { BookingFormData } = require('./colections/collection');

const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}));


app.get('/getData', async (req, res) => {

    try {
        const appointments = await BookingFormData.find();

        res.json(appointments)

    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ message: error.message });
    }
})


app.post('/api/form', (req, res) => {

    try {
        console.log("Data get successfully...", req.body);

        // res.send("code: 201")

        const form = new BookingFormData(req.body);
        form.save();
        res.status(201).json({ message: 'Form submitted successfully!' });

    } catch (err) {
        console.error("Error saving data:", err.message); // More detailed
        res.status(500).json({ error: 'Failed to save form data: ' + err.message });
    }
});

app.put('/api/appointments/:id', async (req, res) => {
    try {

        const { id } = req.params
        const { status } = req.body

        const updateAppointment = await BookingFormData.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        )

        if (!updateAppointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        res.json(updateAppointment)

    } catch (error) {
        console.log("Error updating status", error)
        res.status(500).json({ error: 'Failed to update status of appt' })

    }
})


// Start server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
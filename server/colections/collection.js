
import mongoose from 'mongoose';

const URI = process.env.MONGODB_URL;

mongoose.connect(URI, { autoIndex: false })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

const FormDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    doctor: String,
    date: Date,
    time: String,
    reason: String,
    status: String
});


export const BookingFormData = mongoose.model('BookingFormData', FormDataSchema)
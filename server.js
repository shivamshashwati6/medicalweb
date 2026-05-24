const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from the dist directory (built React files)
app.use(express.static(path.join(__dirname, 'dist')));

// Store appointments in memory
const appointments = [];
// Store contact messages in memory
const contacts = [];

// API Endpoint to handle appointment booking
app.post('/api/appointments', (req, res) => {
    const { name, email, phone, date, department } = req.body;

    // Basic Validation
    if (!name || !email || !date || !department) {
        return res.status(400).json({
            success: false,
            message: 'Please provide all required fields.'
        });
    }

    // Create new appointment object
    const newAppointment = {
        id: Date.now(),
        name,
        email,
        phone,
        date,
        department,
        status: 'Pending',
        createdAt: new Date().toISOString()
    };

    // Save appointment
    appointments.push(newAppointment);
    
    // Log for server console
    console.log('New Appointment Received:', newAppointment);

    // Send success response
    setTimeout(() => {
        res.status(201).json({
            success: true,
            message: `Thank you ${name}! Your appointment for ${department} on ${date} is confirmed.`,
            appointment: newAppointment
        });
    }, 1000);
});

// API Endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Basic Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Please fill in all required fields (Name, Email, Message).'
        });
    }

    const newContact = {
        id: Date.now(),
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        createdAt: new Date().toISOString()
    };

    contacts.push(newContact);
    console.log('New Contact Message Received:', newContact);

    setTimeout(() => {
        res.status(201).json({
            success: true,
            message: `Thank you, ${name}! Your message has been received. We will get back to you shortly.`
        });
    }, 1000);
});

// Fallback wildcard to serve index.html from dist for client-side routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`CareWell Clinic server is running on http://localhost:${PORT}`);
});

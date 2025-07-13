const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Model
const Feedback = require('./models/Feedback');

// ✅ MongoDB Connection (No extra options)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Failed:", err.message);
        process.exit(1);
    });

// Root Route (for testing)
app.get("/", (req, res) => {
    res.send("🎉 Feedback API is working!");
});

// POST /api/feedback
app.post('/api/feedback', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        res.status(201).json({ success: true, data: newFeedback });
    } catch (err) {
        console.error("❌ Error saving feedback:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


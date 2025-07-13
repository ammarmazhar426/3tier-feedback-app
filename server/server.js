const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Feedback = require('./models/Feedback');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.post('/api/feedback', async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const newFeedback = new Feedback({ name, email, message });
        await newFeedback.save();
        res.status(201).json({ success: true, data: newFeedback });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));


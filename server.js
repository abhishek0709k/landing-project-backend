const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const User = require("./models/user.models.js");
const Contact = require("./models/contact.models.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.post('/api/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed' });
  }
});

app.post("/contact-us", async (req, res) => {
  const { name, email, message } = req.body;
  
  // Validate the input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save the contact form data to MongoDB
    const contactMessage = new Contact({
      name,
      email,
      message
    });

    await contactMessage.save();

    // Send a success response
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    // Catch errors and send a failure response
    res.status(500).json({ error: "There was an error sending your message. Please try again later." });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
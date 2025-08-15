const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const dbConnectionString = "mongodb+srv://Sriramsundaraneeedi:5R5KmzC8rwJrJ0jS@sriram55.ohjc5qd.mongodb.net/pharmaCareDB?retryWrites=true&w=majority&appName=sriram55";

mongoose.connect(dbConnectionString)
  .then(() => console.log("Successfully connected to MongoDB Atlas!"))
  .catch((error) => console.error("Error connecting to MongoDB Atlas:", error));

const medicineSchema = new mongoose.Schema({
  id: Number, name: String, description: String, price: Number, mrp: Number, country: String, seller: String, offers: [String], imageUrl: String, thumbnails: [String]
});
const Medicine = mongoose.model('Medicine', medicineSchema);

const userSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

app.get('/api/medicines', async (req, res) => {
  try {
    const medicines = await Medicine.find({});
    console.log(`Found ${medicines.length} medicines in the database.`);
    res.json(medicines);
  } catch (error) {
    console.error("Server error while fetching medicines:", error);
    res.status(500).json({ message: "Error fetching medicines." });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { mobileNumber, password } = req.body;
    const existingUser = await User.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({ message: "User with this mobile number already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ mobileNumber, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration." });
  }
});

app.post('/api/login', async (req, res) => {
    try {
        const { mobileNumber, password } = req.body;
        const user = await User.findOne({ mobileNumber });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }
        const payload = { userId: user._id };
        const token = jwt.sign(payload, "yourSecretKey", { expiresIn: '1h' });
        res.json({ token, message: "Logged in successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Server error during login." });
    }
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} and is accessible on your network.`);
});

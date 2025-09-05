const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
    console.log("1. Register function started.");
    const { name, email, password } = req.body;
    console.log("2. Received data:", { name, email });

    // Add a check to ensure password is not undefined
    if (typeof password !== 'string') {
        console.error("3. Error: Password is missing or not a string.");
        return res.status(400).json({ message: "Password is required." });
    }

    try {
        console.log("3. Attempting to hash password...");
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("4. Password hashed successfully. Attempting to create user...");

        const user = await User.create({ name, email, password: hashedPassword });
        console.log("5. User created successfully in DB with ID:", user.id);

        res.status(201).json({ message: "User registered successfully!", userId: user.id });
        console.log("6. Response sent successfully.");
    } catch (error) {
        console.error("---!!! SERVER CRASH ERROR !!!---");
        console.error(error); // This will print the detailed database or validation error
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};
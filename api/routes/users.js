const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Mock user database (users.json)
let users = require("../data/users.json");

// Utility function to find user by email
const findUserByEmail = (email) => users.find((user) => user.email === email);

// Register a new user
router.post("/register", async (req, res) => {
  const { displayName, firstName, lastName, email, password, country } =
    req.body;

  if (
    !displayName ||
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !country
  ) {
    return res.status(400).send({ message: "Please provide all fields" });
  }

  // Check if the user already exists
  const existingUser = findUserByEmail(email);
  if (existingUser) {
    return res
      .status(400)
      .send({ message: "User with this email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = {
    id: users.length + 1, // Simple auto-incremented ID
    displayName,
    firstName,
    lastName,
    email,
    country,
    password: hashedPassword,
  };

  // Save the new user to "database"
  users.push(newUser);

  res.status(201).json({ message: "User registered successfully" });
});

// Login a user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Please provide email and password" });
  }

  const user = findUserByEmail(email);

  if (!user) {
    return res.status(400).send({ message: "User not found" });
  }

  // Compare the provided password with the hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", userId: user.id });
});

router.post("/reset-password", async (req, res) => {
  const { email } = req.body;

  // Validate Input
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address." });
  }

  try {
    // Simulate Token Generation
    const resetToken = Math.random().toString(36).substr(2);

    // Simulate Sending Email
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Or any email service
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    await transporter.sendMail({
      from: '"Gamotore Support" <support@gamotore.com>',
      to: email,
      subject: "Reset Your Gamotore Password",
      text: `Click the link to reset your password: https://gamotore.com/reset?token=${resetToken}`,
    });

    res.status(200).json({ message: "Reset link sent!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ message: "Failed to send reset email." });
  }
});

// Register a new user
router.post("/profile/update/:userId", async (req, res) => {
  const {
    displayName,
    firstName,
    lastName,
    email,
    oldPassword,
    newPassword,
    country,
  } = req.body;

  const id = parseInt(req.params.userId);

  if (
    !displayName ||
    !email ||
    !oldPassword ||
    !newPassword ||
    !firstName ||
    !lastName ||
    !country
  ) {
    return res.status(400).send({ message: "Please provide all fields" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Create a new user
  const newUser = {
    displayName,
    firstName,
    lastName,
    email,
    country,
    password: hashedPassword,
  };

  // Save the new user to "database"
  users[id - 1] = { ...users[id - 1], ...newUser };

  res.status(200).json({ message: "User updated successfully" });
});

// Get user profile
router.get("/profile/:userId", (req, res) => {
  const { userId } = req.params;

  const user = users.find((user) => user.id === parseInt(userId));

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }

  // Exclude password field from response
  const { password, ...userProfile } = user;

  res.json(userProfile);
});

module.exports = router;

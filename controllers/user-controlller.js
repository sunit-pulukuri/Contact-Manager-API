const express = require("express");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc Register new user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required to register!");
  }

  // Check if the user already exists
  const userAvailable = await UserModel.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password: ", hashedPassword);

  // Create the new user
  const newUser = await UserModel.create({
    username,
    email,
    password: hashedPassword,
  });

  // Respond with the newly created user
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    });
    console.log(newUser);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const user = await UserModel.findOne({ email });
  //checking the password entered with the stored hashed password
  if (user && bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    res.status(200).json({ accessToken });
  }else{
    res.status(401);
    throw new Error("User or password is not valid")
  }

  res.json({ message: "Login user" });
});

// @desc Current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    const {username, email} = req.body;
  res.json({
    message : "User is authenticated",
    user_details: req.user
    
  });
});

module.exports = { registerUser, loginUser, currentUser };

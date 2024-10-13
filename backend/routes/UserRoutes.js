const express = require("express");
const multer = require("multer");
const User = require("../models/User");
const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// POST route to submit user data and images
const userRoutes = (io) => {
  router.post("/submit", upload.array("images", 10), async (req, res) => {
    const { name, social_media_handle } = req.body;
    const imagePaths = req.files.map((file) => file.path);

    try {
      const newUser = new User({
        name,
        social_media_handle,
        images: imagePaths,
      });
      await newUser.save();
      io.emit("newUser", newUser); // Broadcast new user submission to all connected clients
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  // GET route to fetch all user submissions
  router.get("/submissions", async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  router.get("/", async (req, res) => {
    try {
      res.json("Welcome");
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });

  return router;
};

module.exports = userRoutes;

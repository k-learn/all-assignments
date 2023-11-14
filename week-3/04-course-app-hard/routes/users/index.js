const express = require("express");
const { authMiddleware, SECRET } = require("../../auth");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../../db");

const router = express.Router();

router.post('/signup',  async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    console.log(user);
    if (user) {
        return res.status(403).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, { expiresIn: "1h" });
    return res.status(200).json({ message: "User created succesfully", token });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.headers;
    const user = await User.findOne({ username, password });
    if (!user) {
        return res.status(403).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ username, role: "user" }, SECRET, { expiresIn: '1h' });
    return res.json({ message: "Logged in successfully", token });
});

router.get('/courses', authMiddleware, async (_, res) => {
    const courses = await Course.find({ published: true });
    return res.json({ courses });
});

router.post('/courses/:courseId', authMiddleware, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
        return res.status(403).json({ message: "Course not found" });
    }
    const user = await User.findOne({ username: req.username });
    user.purchasedCourses.push(course);
    await user.save();
    return res.json({ message: "Course purchased successfully" });
});

router.get('/purchasedCourses', async (req, res) => {
    const user = await User.findOne({ username: req.username }).populate("purchasedCourses");
    if (!user) {
        return res.status(403).json({ message: "User not found" });
    }
    return res.json({ purchasedCourses: user.purchasedCourses || [] });
});

module.exports = router;

const express = require("express");
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../../db");
const { SECRET, authMiddleware } = require("../../auth");

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (admin) {
        return res.status(403).json({ message: "Admin already exists" });
    }
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin"}, SECRET, { expiresIn: "1h" });    
    return res.json({ message: "Admin created succesddfully", token });
});

router.post('/login', (req, res) => {
    const { username, password } = req.headers;
    const admin = Admin.findOne({ username, password });
    if (!admin) {
        return res.status(404).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ username, role: "admin"}, SECRET, { expiresIn: "1h" });
    return res.json({ message: "Logged in successfully", token });
});

router.post('/courses', authMiddleware, async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    return res.json({ mesage: "Course created successfully", courseId: course.id });
});

router.put('/courses/:courseId', authMiddleware, async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }
    return res.json({ message: "Course updated successfully" });
});

router.get('/courses', authMiddleware, async (_, res) => {
    const courses = await Course.find({});
    return res.json({ courses });
});

module.exports = router;

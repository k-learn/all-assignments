const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL, { dbName: "week-3" });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { User, Admin, Course};

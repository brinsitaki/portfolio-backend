
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error:", err));


const infoSchema = new mongoose.Schema({
  email : String,
  linkedIn: String,
  github: String,
  cv: String,
  jobTitles: [String],
});


const skillSchema = new mongoose.Schema({
  title: String,
  level: String,
  logoLink: String,
  domain: String,
});

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  domain: String,
  techStack: [String],
  photoUrl: String,
  githubUrl: String,
  hostUrl: String,
  apk: String,
  demo: String,
});


const Info = mongoose.model("Info",infoSchema);
const Skill = mongoose.model("Skill", skillSchema);
const Project = mongoose.model("Project", projectSchema);


app.get("/", async (req, res) => {
  try {
    const infos = await Info.find();
    const skills = await Skill.find();
    const projects = await Project.find();
    res.json({ infos , skills , projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
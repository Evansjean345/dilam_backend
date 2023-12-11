const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    username: { type: String },
    genre: { type: String, lowercase: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    password: { type: String, trim: true },
    profilPic: { type: String },
    history: { type: String },
    documentPic: { type: String },
    nationality: { type: String },
    about: { type: String },
    pays: { type: String },
    birthday: { type: String },
    interest: {
      study: { type: String },
      where: { type: String },
      when: { type: String },
    },
    formation: {
      level: { type: String },
      study: { type: String },
      experience: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

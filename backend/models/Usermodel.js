import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
  },
  phone: {
    type: String,
    required: false,
    match: [/^\d{10}$/, "Please enter a valid phone number"],
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


//Hashing the Password before saving it to the database

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
    next();


});


const User = mongoose.model("User", userSchema);

export default User;
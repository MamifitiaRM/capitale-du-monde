import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { CONTINENTS, DIFFICULTIES } from "../data/levels.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    points: [
      {
        _id: false,
        continent: {
          type: String,
          enum: [...CONTINENTS, "all"],
          required: true,
        },
        level: {
          type: String,
          enum: DIFFICULTIES,
          required: true,
        },
        point: {
          type: Number,
          default: 0,
        },
      },
    ],
    totalPoint: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
});

const User = mongoose.model("User", userSchema);

export default User;

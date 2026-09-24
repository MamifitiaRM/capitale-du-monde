import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const COOKIE_MAX_AGE = 3 * 24 * 60 * 60 * 1000;

const setCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
    expiresIn: "3d",
  });
  res.cookie("myToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE,
  });
};

const text = (value) => (typeof value === "string" ? value.trim() : "");

export const register = async (req, res) => {
  const { password } = req.body ?? {};
  const name = text(req.body?.name);
  const email = text(req.body?.email).toLowerCase();

  if (!name || !email || typeof password !== "string" || !password) {
    return res.status(400).json({
      success: false,
      message: "Veuillez remplir tous les champs avant de valider",
    });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Le mot de passe doit contenir au moins 8 caractères",
    });
  }
  if (await User.exists({ email })) {
    return res.status(409).json({
      success: false,
      message: "Cette adresse email est déjà associée à un autre compte",
    });
  }

  const user = await User.create({ name, email, password });
  setCookie(res, user._id);
  res.status(201).json({ success: true, user });
};

export const login = async (req, res) => {
  const { password } = req.body ?? {};
  const email = text(req.body?.email).toLowerCase();

  if (!email || typeof password !== "string" || !password) {
    return res.status(400).json({
      success: false,
      message: "Veuillez compléter tous les champs avant de continuer",
    });
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      success: false,
      message: "Email ou mot de passe invalide",
    });
  }

  setCookie(res, user._id);
  res.json({ success: true, user });
};

export const actualUser = (req, res) => {
  res.json({ success: true, user: req.user });
};

export const logout = (req, res) => {
  res.clearCookie("myToken");
  res.json({ success: true, message: "Utilisateur déconnecté" });
};

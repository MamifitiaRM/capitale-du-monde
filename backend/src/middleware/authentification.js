import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const unauthorized = (res, message) =>
  res.status(401).json({ success: false, message });

const authentication = async (req, res, next) => {
  const token = req.cookies.myToken;
  if (!token) return unauthorized(res, "Authentification requise");

  let payload;
  try {
    payload = jwt.verify(token, process.env.TOKEN_SECRET);
  } catch {
    return unauthorized(res, "Session expirée, veuillez vous reconnecter");
  }

  const user = await User.findById(payload.userId).select("-password");
  if (!user) return unauthorized(res, "Utilisateur introuvable");

  req.user = user;
  next();
};

export default authentication;

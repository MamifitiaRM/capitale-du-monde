export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: "Ressource introuvable" });
};

export const errorHandler = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    const message = Object.values(error.errors)[0]?.message;
    return res.status(400).json({ success: false, message });
  }
  if (error.code === 11000) {
    return res
      .status(409)
      .json({ success: false, message: "Cette valeur existe déjà" });
  }

  const status = error.status ?? 500;
  if (status >= 500) console.error(error);

  res.status(status).json({
    success: false,
    message: status >= 500 ? "Erreur interne du serveur" : "Requête invalide",
  });
};

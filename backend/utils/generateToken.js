import jwt from "jsonwebtoken";

export const generateToken = (req, res, userId) => {
  // Generating a JWT token for the authenticated user
  const token = jwt.sign(
    { userId },
    "e9b8d1c44adf478ca9d1a264f5f9f9b5ae9f72ef0c6cf0f567b1d6c4f72861b2",
    {
      expiresIn: req.body.remember ? 365 * 24 + "h" : "24h",
    }
  );

  // Setting the JWT as an HTTP-only cookie for enhanced security
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
  });
};

export const authMiddleware = (req, res, next) => {
  // Optional: log to confirm it's being hit
  console.log("authMiddleware triggered");

  // Token check
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  // Acceptable tokens
  const allowedTokens = ["token", "jwt"]; // replace with real ones later
  if (!allowedTokens.includes(token)) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Token not recognized" });
  }

  // mock user headers for downstream services
  req.headers["x-user-id"] = "12345";
  req.headers["x-user-level"] = "1";
  // req.headers['x-user-category'] = 'abc'; // only needed if userLevel === 2

  // req.headers['x-user-id'] = decodedToken.userId;
  // req.headers['x-user-level'] = decodedToken.userLevel;

  // Dummy user set (simulate authentication)
  req.user = { name: "Test User", userLevel: 1 }; // this will prevent crash on req.user

  next();
};

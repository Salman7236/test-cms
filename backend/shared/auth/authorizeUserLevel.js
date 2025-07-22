export const authorizeUserLevel = (requiredLevel) => {
  console.log(`Required level is ${requiredLevel}`);

  return (req, res, next) => {
    console.log("Auth user");
    console.log(req.user);
    //if (!req.user || requiredLevelObj.includes(req.user.userLevel)) {
    if (!req.user || req.user.userLevel > requiredLevel) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient privileges" });
    }
    next();
  };
};

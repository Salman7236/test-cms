import mongoose from "mongoose";
import { User } from "../../models/User.js";
import { UserType } from "../../models/UserType.js";

export const authController = async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
      userPwd: req.body.userPwd,
    });

    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const userTypeId = user.userTypeId;

    if (!userTypeId)
      return res.status(400).json({ error: "No user type entered" });

    const userType = await UserType.findById({ _id: userTypeId });

    if (!userType) return res.status(404).json({ error: "Invalid user type" });

    return res.status(200).json({
      message: "Login Successful",
      token: "jwt",
      userTypeId,
      userLevel: userType.userLevel,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ error: "Auth service error", details: err.message });
  }
};

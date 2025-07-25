import { User } from "../../models/User.js";
import { UserType } from "../../models/UserType.js";

export const registerUserController = async (req, res) => {
  try {
    // Set userLevel from userTypeId before creating the user
    if (req.body.userTypeId) {
      const userType = await UserType.findById(req.body.userTypeId);
      if (userType) {
        req.body.userLevel = userType.level;
      }
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json({ message: `User ${newUser.userName} saved` });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern.userName) {
      return res.status(409).json({ error: "Username is already taken" });
    }

    if (err.name === "ValidationError")
      return res.status(400).json({ error: "Fields missing" });

    res.status(500).json({ error: "Could not create user" });
  }
};

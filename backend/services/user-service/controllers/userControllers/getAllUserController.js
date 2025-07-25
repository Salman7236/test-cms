import { User } from "../../models/User.js";
import { accessUsersPolicy } from "../../policy/userAuthPolicy.js";

export const getAllUserController = async (req, res) => {
  try {
    const usersObj = req.user;
    console.log("Controller");
    console.log(usersObj);
    //const filters = accessUsersPolicy(usersObj)
    const users = await User.find();
    return res.status(200).json({ users });
  } catch (err) {
    console.error("User Fetch Error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

import { User } from "../../models/User.js";

export const patchUserController = async (req, res) => {
  const { id } = req.params;
  try {
    // Update userLevel if userTypeId is being changed
    if (req.body.userTypeId) {
      const userType = await UserType.findById(req.body.userTypeId);
      if (userType) {
        req.body.userLevel = userType.level;
      }
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "Data Updated" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

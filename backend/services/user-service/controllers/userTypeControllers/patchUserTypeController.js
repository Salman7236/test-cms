import { UserType } from "../../models/UserType.js";

export const patchUserTypeController = async (req, res) => {
  const { id } = req.params;
  try {
    const userType = await UserType.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!userType)
      return res.status(404).json({ error: "User type not found" });

    res.status(200).json({ message: "Data Updated" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

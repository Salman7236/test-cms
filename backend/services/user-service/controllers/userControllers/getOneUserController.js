import { User } from "../../models/User.js";

export const getOneUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id)
      .populate("companyId")
      .populate("userTypeId");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

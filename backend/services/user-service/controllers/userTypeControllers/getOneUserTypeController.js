import { UserType } from "../../models/UserType.js";

export const getOneUserTypeController = async (req, res) => {
    const { id } = req.params;
    try {
        const userType = await UserType.findById(id)

        if (!userType) return res.status(404).json({ error: "User type not found" })

        res.status(200).json({ user: userType })
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}
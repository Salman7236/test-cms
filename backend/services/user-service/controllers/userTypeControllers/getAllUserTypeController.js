import { UserType } from "../../models/UserType.js"

export const getAllUserTypeController = async (req, res) => {
    try {
        const userType = await UserType.find()
        return res.status(200).json({ userType })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}
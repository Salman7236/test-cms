import { UserType } from "../../models/UserType.js"

export const registerUserTypeController = async (req, res) => {
    try {
        const newUserType = new UserType(req.body)
        await newUserType.save()
        return res.status(201).json({ message: `User ${newUserType.userType} saved` })
    } catch (err) {
        if (err.code === 11000 && err.keyPattern.userType) {
            return res.status(409).json({ error: "User type already created" })
        }
        res.status(500).json({ error: 'Could not create user type' })
    }
}
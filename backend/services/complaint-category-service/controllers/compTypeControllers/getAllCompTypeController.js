import { config as dotenvConfig } from "dotenv"

dotenvConfig()

export const getAllCompTypeController = async (req, res) => {
    const { compid, subid } = req.params;
    try {
        res.redirect(`http://localhost:${process.env.PORT}/complaint-categories/${compid}/sub-cat/${subid}/`)
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}
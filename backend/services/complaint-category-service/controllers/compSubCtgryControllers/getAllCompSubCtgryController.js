import { config as dotenvConfig } from "dotenv"

dotenvConfig()

export const getAllCompSubCtgryController = async (req, res) => {
    const { compid } = req.params;
    try {
        res.redirect(`http://localhost:${process.env.PORT}/${compid}/`)
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}
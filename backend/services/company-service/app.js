import mongoose from "mongoose"
import { config as dotenvConfig } from "dotenv"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { router } from "./routers/router.js"
import { extractUserMiddleware } from "../../shared/middleware/extractUserMiddleware.js"
import { authorizeUserLevel } from "../../shared/auth/authorizeUserLevel.js"

dotenvConfig()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(morgan("combined"))
app.use('/companies', extractUserMiddleware, authorizeUserLevel(1), router)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Company service active on ' + PORT)
        })
    })
    .catch(e => console.log('Failed to connect: ' + e))
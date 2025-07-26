import mongoose from "mongoose"
import { config as dotenvConfig } from "dotenv"
import express, { application } from "express"
import cors from "cors"
import morgan from "morgan"
import { compCtgryRouter } from "./routers/compCtgryRouter.js"
import { extractUserMiddleware } from "../../shared/middleware/extractUserMiddleware.js"
import { authorizeUserLevel } from "../../shared/auth/authorizeUserLevel.js"
import { getCompleteSubCtgry } from "./controllers/getCompleteControllers/getCompleteSubCtrgry.js"
import { getCompleteType } from "./controllers/getCompleteControllers/getCompleteType.js"

dotenvConfig()

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())
app.use(morgan("combined"))
app.use('/complaint-categories', extractUserMiddleware, authorizeUserLevel(1), compCtgryRouter)
app.get('/subcat-complete', extractUserMiddleware, authorizeUserLevel(1), getCompleteSubCtgry)
app.get('/types-complete', extractUserMiddleware, authorizeUserLevel(1), getCompleteType)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to Mongo DB')

        app.listen(PORT, () => {
            console.log('Complaint category service active on ' + PORT)
        })
    })
    .catch(e => console.log('Failed to connect: ' + e))
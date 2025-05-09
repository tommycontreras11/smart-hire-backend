import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import routers from './routers'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(routers)

export default app
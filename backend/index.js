import express from "express";
import bodyParser from "body-parser";
import user_router from "./router/router.js";
import  cors from "cors"

import { Mongo_DB } from "./connection/connection.js";

const app=express()
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


 app.use("/",user_router)
 Mongo_DB()
app.listen(4201)
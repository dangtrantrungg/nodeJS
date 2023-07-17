import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoute from './route/web'
import pool from './config/connectDB'
import initAPIRoute from './route/api'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080;


//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);
initAPIRoute(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

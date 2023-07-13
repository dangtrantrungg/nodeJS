import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoute from './route/web'
import connection from './config/connectDB'
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8080;


//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

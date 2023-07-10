import express from "express";
import homeControler from '../controler/homeControler'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/about', (req, res) => {
        res.send(' hello chungchan!')
    })

    router.get('/', homeControler.getHomePage)
    router.get('/detail/user/:userID', homeControler.getDetailPage)

    return app.use('/', router);
}

export default initWebRoute
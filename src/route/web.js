import express from "express";
import homeControler from '../controler/homeControler'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/about', (req, res) => {
        res.send(' hello chungchan!')
    })

    router.get('/', homeControler.getHomePage)
    router.get('/detail/user/:userID', homeControler.getDetailPage)
    router.post('/add/user', homeControler.getNewUser)
    router.post('/delete/user', homeControler.deleteUser)
    router.get('/edit/user/:userID', homeControler.editUser)
    router.post('/update/user', homeControler.updateUser)
    return app.use('/', router);
}

export default initWebRoute
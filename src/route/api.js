import express from "express";
import APIControler from '../controler/APIControler'
let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', APIControler.getAllUsers)
    router.post('/create', APIControler.createUsers)
    router.put('/update', APIControler.updateUsers)
    router.delete('/delete/', APIControler.deleteUsers)
    return app.use('/api/v1/', router);
}

export default initAPIRoute
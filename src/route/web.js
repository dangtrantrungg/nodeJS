import express from "express";
import homeControler from '../controler/homeControler'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/about', (req, res) => {
        res.send(' hello chungchan!')
    });
    router.get('/', homeControler.getHomePage);
    router.get('/detail/user/:userID', homeControler.getDetailPage);
    router.post('/add/user', homeControler.getNewUser);
    router.post('/delete/user', homeControler.deleteUser);
    router.get('/edit/user/:userID', homeControler.editUser);
    router.post('/update/user', homeControler.updateUser);
    router.get('/upload', homeControler.getUploadPage);
    router.post('/upload-profile-pic', homeControler.postUloadFilePic);
    router.post('/upload-multiple-images', homeControler.postMultipleFiles);
    return app.use('/', router);
}

export default initWebRoute
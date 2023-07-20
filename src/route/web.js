import express from "express";
import homeControler from '../controler/homeControler'
import multer from "multer";
import path from 'path'
let router = express.Router();
var appRoot = require('app-root-path');

const initWebRoute = (app) => {
    router.get('/about', (req, res) => {
        res.send(' hello chungchan!')
    })

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, appRoot + '/src/public/img');
        },

        // By default, multer removes file extensions so let's add them back
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    });

    const imageFilter = function (req, file, cb) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    let upload = multer({ storage: storage, fileFilter: imageFilter });

    router.get('/', homeControler.getHomePage)
    router.get('/detail/user/:userID', homeControler.getDetailPage)
    router.post('/add/user', homeControler.getNewUser)
    router.post('/delete/user', homeControler.deleteUser)
    router.get('/edit/user/:userID', homeControler.editUser)
    router.post('/update/user', homeControler.updateUser)
    router.get('/upload', homeControler.getUploadPage)
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeControler.postUloadFilePic)
    return app.use('/', router);
}

export default initWebRoute
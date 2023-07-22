import pool from "../config/connectDB"
import multer from "multer";
import path from 'path';
var appRoot = require('app-root-path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, appRoot + '/src/public/img');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};


let getHomePage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `user`');
    return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req, res) => {
    // console.log(req.params)
    let userID = req.params.userID
    let user = await pool.execute('SELECT * FROM `user` WHERE id = ?', [userID]);
    // console.log(user[0])
    return res.send(user[0])
}

let getNewUser = async (req, res) => {
    // console.log(req.body)
    let { firstName, lastName, email, address } = req.body
    await pool.execute('INSERT INTO user (firstName, lastName, email, address) VALUES (?, ?, ?, ?)', [firstName, lastName,
        email, address]);
    return res.redirect('/')

}

let deleteUser = async (req, res) => {
    let idUser = req.body.userID
    await pool.execute('DELETE FROM user WHERE id = ?; ', [idUser]);
    return res.redirect('/')
}

let editUser = async (req, res) => {
    let userID = req.params.userID
    let [user] = await pool.execute('SELECT * FROM `user` WHERE id = ?', [userID]);
    return res.render('updateUser.ejs', { data: user[0] })
}

let updateUser = async (req, res) => {
    // res.send('123')
    // console.log(req.body)
    let { firstName, lastName, email, address, id } = req.body
    await pool.execute('UPDATE user SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
        [firstName, lastName, email, address, id]);
    // console.log(req.body)
    return res.redirect('/')
}
let getUploadPage = async (req, res) => {
    return res.render('upload.ejs')
}

const upload = multer({ storage, fileFilter }).single('profile_pic')
let postUloadFilePic = async (req, res) => {
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/img/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

const uploadMultiple = multer({ storage, fileFilter }).array('multiple_images', 10);
let postMultipleFiles = async (req, res) => {
    uploadMultiple(req, res, function (err) {
        console.log(req.files);
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.files) {
            return res.send('Please select an image to upload');
        } else if (err instanceof multer.MulterError) {
            return res.send(err);
        } else if (err) {
            return res.send(err);
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/img/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
    });
}
module.exports = {
    getHomePage, getDetailPage, getNewUser, deleteUser, editUser, updateUser, getUploadPage, postUloadFilePic, postMultipleFiles

}

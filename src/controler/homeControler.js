import pool from "../config/connectDB"
import multer from "multer";
import path from 'path'

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

const upload = multer().single('profile_pic')

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
module.exports = {
    getHomePage, getDetailPage, getNewUser, deleteUser, editUser, updateUser, getUploadPage, postUloadFilePic

}

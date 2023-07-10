import pool from "../config/connectDB"
let getHomePage = async (req, res) => {
    //logic
    const [rows, fields] = await pool.execute('SELECT * FROM `user`');
    return res.render('index.ejs', { dataUser: rows })
}

let getDetailPage = async (req, res) => {
    // console.log(req.params)
    let userID = req.params.userID
    let user = await pool.execute('SELECT * FROM `user` WHERE id = ?', [userID]);
    res.send(user[0])
}
module.exports = {
    getHomePage, getDetailPage

}

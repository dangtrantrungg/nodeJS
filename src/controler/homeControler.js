import connection from "../config/connectDB"
let getHomePage = (req, res) => {
    //logic
    let data = []
    connection.query(
        'SELECT * FROM `user`',
        function (err, results, fields) {
            data = results.map((row) => { return row })
            return res.render('index.ejs', { dataUser: JSON.stringify(data) })
        }
    );
}

module.exports = {
    getHomePage
}
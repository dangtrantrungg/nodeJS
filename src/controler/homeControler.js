import connection from "../config/connectDB"
let getHomePage = (req, res) => {
    //logic
    let data = []
    connection.query(
        'SELECT * FROM `user`',
        function (err, results, fields) {
            data = results.map((row) => {
                let id = row.id;
                let firstName = row.firstname;
                let lastName = row.lastname;
                let email = row.email;
                return row
            });
            return res.render('index.ejs', { dataUser: data })
        })
}
module.exports = {
    getHomePage
}
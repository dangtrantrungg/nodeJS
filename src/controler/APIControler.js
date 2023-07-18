import pool from "../config/connectDB"

let getAllUsers = async (req, res) => {
    try {
        let [rows, fields] = await pool.execute('SELECT * FROM `user`');
    } catch (error) {
        throw error
    }
    return res.status(201).json({
        message: "Successfully Registered",
        status: 201,
        data: rows
    })

}

let createUsers = async (req, res) => {
    let { firstName, lastName, email, address } = req.body
    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: "missing information"
        })
    }
    try {
        await pool.execute('INSERT INTO user (firstName, lastName, email, address) VALUES (?, ?, ?, ?)', [firstName, lastName,
            email, address]);
    } catch (error) {
        throw error
    }
    return res.status(201).json({
        message: "succesfully",
    })
}

let updateUsers = async (req, res) => {

    let { firstName, lastName, email, address, id } = req.body
    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: "missing information"
        })
    }
    try {
        await pool.execute('UPDATE user SET firstName = ?, lastName = ?, email = ?, address = ? WHERE id = ?',
            [firstName, lastName, email, address, id]);
    } catch (error) {
        throw error
    }
    return res.status(201).json({
        message: "Successfully Registered",
        status: 201
    })
}

let deleteUsers = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            message: "missing information"
        })
    }
    try {
        await pool.execute('DELETE FROM user WHERE id = ?; ', [id]);
    } catch (error) {
        throw error;
    }

    return res.status(201).json({
        message: "Successfully Registered",
        status: 201
    })
}
module.exports = {
    getAllUsers, createUsers, updateUsers, deleteUsers
}
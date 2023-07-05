
// const express = require('express')
import express from 'express'
import configViewEngine from './config/viewEngine'
require('dotenv').config()

const app = express()
app.use(express.static('public'))
const port = process.env.PORT || 8080;

configViewEngine(app);
app.get('/about', (req, res) => {
    res.send(' hello chungchan!')
})

app.get('/', (req, res) => {
    res.render('index.ejs')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

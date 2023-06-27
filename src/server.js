
// const express = require('express')
import express from 'express'
import configViewEngine from './config/viewEngine'
const app = express()
const port = 3000

configViewEngine(app);
app.get('/', (req, res) => {
    res.send(' hello chungchan!')
})

app.get('/about', (req, res) => {
    res.render('index.ejs')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

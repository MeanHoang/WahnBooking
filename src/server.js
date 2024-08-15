const express = require('express')
const path = require('path');
require('dotenv').config();
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const connectDB = require('./config/connectDB');

const app = express()

const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config view, template engine
configViewEngine(app);

//declare routes
app.use('/', webRoutes);

//connectDB
connectDB();

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
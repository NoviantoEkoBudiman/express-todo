const express = require('express');
const app = express();
const router = require('./routes');
const {Sequelize, connectToDB} = require('./db');
const bodyParser = require('body-parser')

const port = 3000;

app.set("view engine","ejs");
app.use(express.json());
app.use( bodyParser. urlencoded({ extended: true, }) ) 
app.use('/', router);

app.listen(port, async ()=>{
    console.log(`Application run on port: ${port}`);
    await connectToDB();
});
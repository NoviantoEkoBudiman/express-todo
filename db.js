const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('express_todo', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectToDB = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Succes connect to database");
    }catch(error){
        console.log(error);
    }
}

module.exports = { sequelize, connectToDB }
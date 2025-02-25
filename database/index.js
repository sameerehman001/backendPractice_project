const mongoose = require('mongoose');

const { MONGODB_CONNECTION_STRING } = require('../config/index')


const dbConnection = async () => {
    try{
        const conn = await mongoose.connect(MONGODB_CONNECTION_STRING);
        console.log(`Database is connected to host: ${conn.connection.host}`)
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
    
}

module.exports = dbConnection;
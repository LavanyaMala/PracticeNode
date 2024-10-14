const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, { 
        
    }).then(con => {
        console.log(`MongoDB Database connected with host: ${con.connection.host}`);
    }).catch(err => {
        console.error('Database connection error:', err);
    });
};

module.exports = connectDatabase;

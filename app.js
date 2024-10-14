const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDatabase = require('./config/database');
const middlewareError = require("./middlewares/errors.js")

dotenv.config({ path: "./config/config.env" });

// Connecting to database
connectDatabase();

// Setup body parser
app.use(express.json());

const jobs = require("./routes/job.js");



app.use("/api/v1/", jobs);

app.use(middlewareError);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});


//Handling Unhandled Promise Rejection

process.on("UnhandledRejection", err =>{
    console.log(`Error : ${err.message}` );
    console.log("Shutting down due to handled unhandled promise rejection");
    server.close(() =>
    {
        process.exit(1);
    });
});
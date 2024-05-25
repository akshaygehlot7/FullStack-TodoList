const app = require("./app")
const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const connectDatabase = require("./config/database")
// const PORT = 4000

dotenv.config({ path: "backend/config/config.env" });

// database
connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(
        `server is running on localhost:${process.env.PORT}`
    );
})
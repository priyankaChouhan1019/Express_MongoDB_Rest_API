const express = require("express");
const  dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const connectdb = require("./config/dbConnection");

 connectdb();

const app = express();
const port = process.env.PORT || 5000 ;

app.use(express.json()) //// Middleware to parse JSON request bodies
app.use("/api/contacts", require("./routes/contactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on ${port}`)
})
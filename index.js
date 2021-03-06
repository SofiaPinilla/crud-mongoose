const express = require("express");
const app = express();
require("dotenv").config();
const {PORT} = process.env;

const { dbConnection } = require("./config/config")
const cors = require('cors')
app.use(express.json())

dbConnection()
app.use(cors())
app.use('/products',require('./routes/products'))
app.use('/users',require('./routes/users'))
app.use('/orders',require('./routes/orders'))

app.listen(PORT, console.log(`Server started on port ${PORT}`));

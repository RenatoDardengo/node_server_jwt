import * as path from 'path';
const srcPath = path.resolve(__dirname, './src');
require('module-alias').addAliases({
    '@src': srcPath,
    '@test': path.resolve(__dirname, './test'),
});
require ('dotenv').config();
const express = require ('express');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const auth = require ("@src/routes/authRoute");

app.use (express.json());
app.use(cors());

app.use ("/admin", auth)
app.listen(port, () => { console.log(`servidor rodando http://localhost:${port}`)})
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
const app = express();

const auth = require ("@src/routes/authRoute");
app.use (express.json());
const port = process.env.PORT;


app.use ("/admin", auth)
app.listen(port,()=>{console.log(`servidor rodando na porta ${port}`)})
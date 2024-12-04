// app.js
const express = require('express');
const formRoutes = require('./routes/formRoutes');
const documentRoutes = require('./routes/documentRoutes');
const errorHandler = require('./utils/errorHandler');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/api/form', formRoutes);

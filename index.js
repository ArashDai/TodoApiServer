const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

console.log('.env',process.env.DATABASE_URL)

//App setup
app.use(morgan('combined'));
app.use(cors());//use cors to specify access
app.use(bodyParser.json({ type:'*/*' }));
app.use(bodyParser.urlencoded({extended:false}));
router(app);

//Server setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on ',port);
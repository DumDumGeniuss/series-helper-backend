import express from 'express';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import multer from 'multer';
import dotenv from 'dotenv';
import db from './config/db.js';
import routes from './config/routes.js';

dotenv.config();
db(process.env.MONGO_DB_URL);
const upload = multer({ dest: '/tmp/'});
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
	next();
});

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.use(routes);

// app.use(router)

app.listen(9000);
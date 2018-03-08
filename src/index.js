
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

import multer from 'multer';

var DIR = 'uploads/';

import config from './cofig/config';
import routes from './app/index.route';

const app = express()



mongoose.connect(config.mongohost);

var db = mongoose.connection;

db.on('error', function (e) {
    console.log(e);
})

db.once('open', function () {
    console.log('Connected to database...');
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static('uploads'));

app.use('/api', routes);

// Error
app.use((err, req, res, next) => {

    res.status(err.status || 500).json({
        msg: err.message,        
        stack: err.stack,
    })
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
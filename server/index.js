/* eslint-disable no-undef */
//create basic express api server
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import authController from './login.controller.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

mongoose.connect(process.env.MONGODB_URI, {}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log('Error connecting to MongoDB', err)
});

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.use('/api/auth', authController);


process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    process.exit(1);
});

process.on('uncaughtException', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    process.exit(1);
});


app.listen(port, () => {
    console.log('Server is running on port, ', port)
})
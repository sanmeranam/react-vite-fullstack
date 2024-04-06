//create basic express api server
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.get('/api/users', (req, res) => {
    res.json(
        [
            { "id": 1, "name": "John Doe" },
            { "id": 2, "name": "Jane Smith" },
            { "id": 3, "name": "Bob Johnson" }
        ]
    )
});


process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    app.close(() => process.exit(1));
});

process.on('uncaughtException', (err, promise) => {
    console.log(`Logged Error: ${err}`);
    app.close(() => process.exit(1));
});


app.listen(port, () => {
    console.log('Server is running on port, ', port)
})
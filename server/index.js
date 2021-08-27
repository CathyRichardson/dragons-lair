const express = require('express');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const authCtrl = require('./controllers/authController')

const { SESSION_SECRET, CONNECTION_STRING } = process.env;
const PORT = 4000;
const app = express();

app.use(express.json());
app.use(
    session({
        resave: true,
        saveUninitialized: false,
        secret: SESSION_SECRET
    })
);

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then((dbInstance) => {
    app.set("db", dbInstance);
    console.log('db connected');
}).catch(e => console.log(e));


app.post('/auth/register', authCtrl.register);


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const express = require('express');
const session = require('express-session');
const massive = require('massive');
require('dotenv').config();
const {
    register,
    login,
    logout
} = require('./controllers/authController');
const {
    dragonTreasure,
    getUserTreasure,
    addUserTreasure,
    getAllTreasure
} = require('./controllers/treasureController');
const {
    usersOnly,
    adminsOnly
} = require('./middleware/authMiddleware');

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

//authorization endpoints
app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/logout', logout);

//treasure endpoints
app.get('/api/treasure/dragon', dragonTreasure);
app.get('/api/treasure/user', usersOnly, getUserTreasure);
app.post('/api/treasure/user', usersOnly, addUserTreasure);
app.get('/api/treasure/all', usersOnly, adminsOnly, getAllTreasure);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
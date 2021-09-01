const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, password, isAdmin } = req.body;
    const db = req.app.get('db');
    const result = await db.get_user(username);
    const existingUser = result[0];
    if (existingUser) {
        res.status(409).send('Username taken');
    } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        // const hash = bcrypt.hashSync(password); -- This line is equivalent to the two above
        const registeredUser = await db.register_user(isAdmin, username, hash);
        const user = registeredUser[0];
        req.session.user = {
            isAdmin: user.is_admin,
            id: user.id,
            username: user.username
        }
        res.status(201).send(req.session.user);
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get('db');
    const foundUser = await db.get_user(username);
    const user = foundUser[0];
    if (!user) {
        res.status(401).send('User not found. Please register as a new user before logging in.');
    } else {
        const isAuthenticated = bcrypt.compareSync(password, user.hash)  //This method compares the password entered by the user at login to the hashed and salted version stored in the database.
        if (!isAuthenticated) {
            res.status(403).send('Incorrect password');
        } else {
            req.session.user = {
                isAdmin: user.is_admin,
                id: user.id,
                username: user.username
            }
        } res.status(200).send(req.session.user);
    }
}

const logout = async (req, res) => {
    req.session.destroy(); // This destroys the data stored on the user's session object, effectively logging the user out.
    res.sendStatus(200);
}

module.exports = {
    register,
    login,
    logout
}
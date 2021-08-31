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

module.exports = {
    register
}
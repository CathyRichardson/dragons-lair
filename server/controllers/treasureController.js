const dragonTreasure = async (req, res) => {
    const result = await req.app.get('db').get_dragon_treasure(1);
    return res.status(200).send(result);
}

const getUserTreasure = async (req, res) => {
    const { id } = req.session.user;
    const result = await req.app.get('db').get_user_treasure(id);
    return res.status(200).send(result);
}

const addUserTreasure = async (req, res) => {
    const { id } = req.session.user;
    const { treasureURL } = req.body;
    const result = await req.app.get('db').add_user_treasure(treasureURL, id);
    return res.status(200).send(result);
}

module.exports = {
    dragonTreasure,
    getUserTreasure,
    addUserTreasure
}
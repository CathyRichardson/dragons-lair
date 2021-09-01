const dragonTreasure = async (req, res) => {
    const result = await req.app.get('db').get_dragon_treasure(1);
    return res.status(200).send(result);
}

module.exports = {
    dragonTreasure
}
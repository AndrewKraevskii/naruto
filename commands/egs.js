const { getGames } = require("epic-free-games");

function getFreeGames(gamesArray) {
    return gamesArray.currents.filter(item => item.price.totalPrice.discountPrice === 0);
}

module.exports = {
    async execute(client, channel, tags, message) {
        try {
            const games = getFreeGames(await getGames("RU"));
            const game_names = games.map(item => item.title);
            client.say(channel, `В egs раздают: ${game_names.join(', ')}`);
        }
        catch (error) {
            console.log(error)
            client.say(channel, `Произошла какая то ошибка, обратитесь к @andrewkraevskii за помощью`)
        }
    },
};
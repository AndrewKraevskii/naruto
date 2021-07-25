var fs = require('fs');



module.exports = {
    name: 'серия',
    cooldown: 1,
    aliases: [],
    episods: JSON.parse(fs.readFileSync('./res/naruto.json', 'utf8')),
    execute(client, channel, tags, message) {
        if (message === '' || message.split(/ +/).length !== 1 || !Number.isInteger(+message)) return;

        const episode_number = +message;

        if (!(0 < episode_number && episode_number <= 500)) {
            client.say(channel, `@${tags.username} такой серии нет :(`);
        }
        const episode = this.episods[episode_number - 1];
        client.say(channel, `${episode.number}; название: ${episode.name}; описание: ${episode.description}`);

    },
};





module.exports = obj;
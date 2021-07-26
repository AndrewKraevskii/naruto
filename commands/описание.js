var fs = require('fs');



module.exports = {
    name: 'описание',
    cooldown: 1,
    aliases: [],
    episods: JSON.parse(fs.readFileSync('./res/naruto.json', 'utf8')),
    execute(client, channel, tags, message) {
        if (message === '' || message.split(/ +/).length !== 1 || !Number.isInteger(+message)) return;

        if (tags.badges === null || tags.badges.moderator !== '1' && tags.badges.broadcaster !== '1') {
            client.say(channel, `@${tags.username} вы не владелец канала или модератор`);
            return;
        }

        const episode_number = +message;

        if (!(0 < episode_number && episode_number <= 500)) {
            client.say(channel, `@${tags.username} такой серии нет :(`);
            return;
        }
        const episode = this.episods[episode_number - 1];

        const output_text = `${episode.description}`;


        let list_of_messages = [];
        let text_portion = '';
        for (let x of output_text.split(/ +/)) {
            if ((text_portion + x).length > 450) {
                list_of_messages.push(text_portion);
                text_portion = '';
            }
            text_portion += x + ' ';
        }
        if (text_portion.length > 0) {
            list_of_messages.push(text_portion);
        }
        list_of_messages.forEach((message, index) => {
            setTimeout(() => client.say(channel, message), 2000 * index);
        })
    },
};
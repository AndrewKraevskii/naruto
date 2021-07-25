var fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const _episods = [];
fs.readFile('./src/наруто описание.html', 'utf8', (err, data) => {
    dom = new JSDOM(data);
    list = dom.window.document.querySelectorAll('#k2Container > div.itemBody > div.itemFullText > p');

    for (let i = 0; i < list.length; ++i) {
        let text = list[i].textContent;
        if (/Сезон.*/.exec(text)) {
            continue;
        }

        const res = /(\d+) серия\((.*)\)\(/.exec(text);
        if (res) {
            _episods.push({
                "number": res[1] - 220,
                "name": res[2],
                "description": ""
            });

            if (i + 1 < list.length && (/(\d+) серия\((.*)\)\(/.exec(list[i + 1].textContent)) === null && (/Сезон.*/.exec(list[i + 1].textContent)) === null) {
                _episods[_episods.length - 1].description = list[i + 1].textContent;
            }
        }

    }
});


module.exports = {
    name: 'серия',
    cooldown: 1,
    aliases: [],
    episods: _episods,
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
const dict = require("dict");

let obj = {
    name: 'статистика',
    cooldown: 1,
    aliases: [],
    channels: dict(),
    onmessage(client, channel, tags, message) {
        message = message.trim();
        if (message === '') return;


        const {} = this.channels.get(channel, ())
        message.split(/ +/).forEach((value) => {
            if (this.words_usage.get(value) === undefined) {
                this.words_usage.set(value, 1);
            } else {
                this.words_usage.set(value, this.words_usage.get(value) + 1);
            }
        });



    },
    execute(client, channel, tags, message) {

        var sorted = [];
        for (var key in this.words_usage) {
            sorted[sorted.length] = key;
        }
        sorted.sort();

        // this.words_usage.forEach((value) => )
    },
};


module.exports = obj;
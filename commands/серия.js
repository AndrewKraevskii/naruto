module.exports = {
    name: 'серия',
    cooldown: 1,
    aliases: [],
    number: 5,
    execute(client, channel, tags, message) {
        client.say(channel, `@${tags.username} временно не работает`);
    },
};
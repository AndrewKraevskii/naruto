module.exports = {
    name: 'бибаметр',
    cooldown: 5,
    execute(client, channel, tags, message) {
        const size = Math.floor(Math.random() * 30) + 1;
        client.say(channel, `@${tags.username} твоя пиписька ${size} см`);
    },
};
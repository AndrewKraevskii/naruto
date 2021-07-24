module.exports = {
    name: 'нарутобот',
    cooldown: 5,
    execute(client, channel, tags, message) {
        client.say(channel, `@${tags.username} https://bit.ly/2W7ECQl`);
    },
};
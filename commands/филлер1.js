module.exports = {
    name: 'филлер1',
    cooldown: 5,
    aliases: ['филлер1', 'ф1'],
    fillersList: [26, 97, 99, 101, 102, 103, 104, 105, 106, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220],
    execute(client, channel, tags, message) {
        if (message.split(' ').length === 1 && Number.isInteger(+message)) {
            for (let i = 0; i < this.fillersList.length; i++) {
                if (this.fillersList[i] >= +message) {
                    if (this.fillersList[i] > +message) {
                        client.say(channel, `@${tags.username} ближайший филлер ${this.fillersList[i]} серия`);
                    } else {
                        client.say(channel, `@${tags.username} ${this.fillersList[i]} серия это филлер`);
                    }
                    return;
                }
            }
            client.say(channel, `@${tags.username} в первом сезоне нет столько серий :(`);
        }
    },
};
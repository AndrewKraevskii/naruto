module.exports = {
    name: 'филлер2',
    cooldown: 5,
    aliases: ['филлер2', 'ф2'],
    fillersList: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 144, 145, 146, 147, 148, 149, 150, 151, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 239, 240, 241, 242, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 271, 279, 280, 281, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294,  295, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357, 358, 359, 360, 361, 376, 377, 389, 390, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 416, 417, 422, 423, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 460, 461, 462, 464, 465, 466, 467, 468],
    execute(client, channel, tags, message) {
        if (message.length !== 0 && message.split(/ +/).length === 1 && Number.isInteger(+message)) {
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
            client.say(channel, `@${tags.username} в шипудене нет столько серий :(`);
        }
    },
};
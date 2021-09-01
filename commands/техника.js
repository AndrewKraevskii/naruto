var fs = require('fs');


function levenshtein(s1, s2, costs) {
    var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;

    costs = costs || {};
    var cr = costs.replace || 1;
    var cri = 0;
    var ci = costs.insert || 1;
    var cd = costs.remove || 1;

    cutHalf = flip = Math.max(l1, l2);

    var minCost = Math.min(cd, ci, cr);
    var minD = Math.max(minCost, (l1 - l2) * cd);
    var minI = Math.max(minCost, (l2 - l1) * ci);
    var buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; ++j, ++ii, ++ii2) {
            cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
}

module.exports = {
    name: 'описание',
    cooldown: 1,
    aliases: [],
    jutsus: JSON.parse(fs.readFileSync('./res/jutsus.json', 'utf8')),
    execute(client, channel, tags, message) {
        if (message === '') return;



        const jutsu_name = message.toLowerCase();
        let minIndex = 0;
        let minLength = Infinity;
        this.jutsus.forEach((jutsu, index) => {
            const len = levenshtein(jutsu.name.replace("Техника ", "").toLowerCase(), jutsu_name, { replace: 1, insert: 2, remove: 2 })
            if (len < minLength) {
                minLength = len;
                minIndex = index;
            }
        });

        const jutsu = this.jutsus[minIndex];
        if (minLength === 0) {
            if ((tags.badges === null || tags.badges.moderator !== '1' && tags.badges.broadcaster !== '1') && tags.username !== 'andrewkraevskii') {
                client.say(channel, `${jutsu.name} Тип: ${jutsu.type}. Элемент: ${jutsu.element}.`);
                return;
            }
            else {
                client.say(channel, `${jutsu.name} ${jutsu.description} Тип: ${jutsu.type}. Элемент: ${jutsu.element}.`);
            }
        }
        else if (minLength < 5) {
            client.say(channel, `${tags.username}: возможно вы имели ввиду "${jutsu.name}"`);
        }
        else {
            client.say(channel, `Не найдено :(`);
        }
    },
};
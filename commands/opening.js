module.exports = {
    name: 'opening',
    cooldown: 1,
    aliases: [],
    number: 5,
    execute(client, channel, tags, message) {
        if (message === '' || message.split(/ +/).length !== 1 || !Math.isInteger(+message)) return;
        const openings = ['https://youtu.be/vxvP9zSOL7s', 'https://youtu.be/mFLZ-I2r3Mc', 'https://youtu.be/aJRu5ltxXjc', 'https://youtu.be/kmL3EuiiWXM', 'https://youtu.be/H3aqR_n3sM4',
            'https://youtu.be/SavhHnWla6c', 'https://youtu.be/lGTp4VogNaQ', 'https://youtu.be/L2ncHzfts_0', 'https://youtu.be/KmrTuNXVrf4', 'https://youtu.be/yu12tTrkJ-g',
            'https://youtu.be/ZR5ZCVQ0puE', 'https://youtu.be/PBsMuTPEJ_A', 'https://youtu.be/cjbA7th2rWo', 'https://youtu.be/lBPqob1QYL4', 'https://youtu.be/_I1N2JFDBwU',
            'https://youtu.be/uCbpPfnfQ7U', 'https://youtu.be/0Uk1OeC7-4g', 'https://youtu.be/HdgD7E6JEE4', 'https://youtu.be/VMkg2F4QfIA', 'https://youtu.be/xQKlfIeqTGM',
        ]

        if (0 < +message && +message <= openings.length)
            client.say(channel, openings[+message - 1]);
        else
            client.say(channel, `@${tags.username} такого нет :(`);
    },
};
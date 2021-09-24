module.exports = {
    name: 'vote',
    is_vote_active: false,
    title: null,
    vote_list: null,
    vote_res: null,
    voted_users: new Set(),
    channel: null,
    onmessage(client, channel, tags, message) {
        if (!this.is_vote_active || this.channel !== channel || this.voted_users.has(tags.username)) return;
        message = +message;
        if (!Number.isInteger(message)) return;
        if (!(1 <= message && message <= this.vote_list.length)) return;
        ++(this.vote_res[message - 1]);
        this.voted_users.add(tags.username)
    },

    close(client, channel) {
        this.is_vote_active = false;
        client.say(channel, `Результат опроса "${this.title}": ${this.vote_list[this.vote_res.indexOf(Math.max(...this.vote_res))]} с результатом ${Math.max(...this.vote_res)}`)
    },

    execute(client, channel, tags, message) {
        if (this.is_vote_active) {
            client.say(channel, `@${tags.username} голосование уже запущено peepoRain`);
            return;
        }
        if (tags['msg-id'] !== 'highlighted-message') {
            client.say(channel, `@${tags.username} можно запустить только с выделенным сообщением`);
            return;
        }
        let vote_list = message.trim().split(/\s*;\s*/);
        if (vote_list.length < 3) {
            client.say(channel, `@${tags.username} слишком мало аргументов (должно быть 3 или больше)`);
            return;
        }

        const title = vote_list.shift();
        this.title = title;
        this.vote_list = vote_list;
        this.is_vote_active = true;
        client.say(channel, `Опрос "${title}" варианты ответа: ${vote_list} голосуйте от 1 до ${vote_list.length}`)
        this.vote_res = new Array(vote_list.length).fill(0);
        this.voted_users = new Set();
        this.channel = channel;
        setTimeout(() => this.close(client, channel), 1000 * 60)
    },
};

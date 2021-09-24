const http = require("https");

function getGames(callback) {
    const options = {
        "method": "GET",
        "hostname": "store.steampowered.com",
        "port": null,
        "path": "/api/featuredcategories/?l=russian",
        "headers": {
            "Content-Length": "0"
        }
    };

    const req = http.request(options, function (res) {
        const chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            const body = Buffer.concat(chunks);
            callback(JSON.parse(body.toString()));
        });
    });

    req.end();
}


module.exports = {
    async execute(client, channel, tags, message) {
        try {
            getGames(i=>console.log(i))
        }
        catch (error) {
            console.log(error)
            client.say(channel, `Произошла какая то ошибка, обратитесь к @andrewkraevskii за помощью`)
        }
    },
};
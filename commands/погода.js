const https = require('https')
require('dotenv').config();

weather_api = `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.WEATHER_KEY}&lang=ru&units=metric&q=`


module.exports = {
    name: 'опенинг',
    cooldown: 1,
    aliases: [],
    execute(client, channel, tags, message) {

        try {
            const query = message.replace(/ +/, '%20')
            const replaced = query.replace(/[&\/\\#,+()$~.'":*?<>{}=]/g, '')

            if (query !== replaced) throw 'Барьер от rprtr258 MMMM'

            https.get(weather_api + query, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);

                res.on('data', (d) => {
                    process.stdout.write(d);
                });

            }).on('error', (e) => {
                console.error(e);
            });

        } catch (err) {
            console.log('не найдено')
        }

    },
};
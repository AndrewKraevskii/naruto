const tmi = require('tmi.js');
const fs = require('fs');
require('dotenv').config();


const Colors = Object.freeze({
    BLUE: { name: "blue", rgb: "#0000ff" },
    CORAL: { name: "coral", rgb: "#ff7f50" },
    DODGERBLUE: { name: "dodgerblue", rgb: "#1e90ff" },
    SPRINGGREEN: { name: "springgreen", rgb: "#00ff7f" },
    YELLOWGREEN: { name: "yellowgreen", rgb: "#9acd32" },
    GREEN: { name: "green", rgb: "#008000" },
    ORANGERED: { name: "orangered", rgb: "#ff4500" },
    RED: { name: "red", rgb: "#FF0000" },
    GOLDENROD: { name: "goldenrod", rgb: "#daa520" },
    HOTPINK: { name: "hotpink", rgb: "#ff69b4" },
    CADETBLUE: { name: "cadetblue", rgb: "#5f9ea0" },
    SEAGREEN: { name: "seagreen", rgb: "#2e8b57" },
    CHOCOLATE: { name: "chocolate", rgb: "#d2691e" },
    BLUEVIOLET: { name: "blueviolet", rgb: "#8a2be2" },
    FIREBRICK: { name: "firebrick", rgb: "#b22222" },
});

class TwitchColor {
    constructor(_color) {
        this.color = null;
        this.setColor(_color);

    }

    setColor(new_color) {
        if (new_color)
            if (typeof new_color === 'number') {
                if (!(0 <= new_color && new_color < 15)) {
                    throw "wrong index";
                }
                this.color = Object.keys(Colors)[new_color];
            }
        if (typeof new_color === 'string') {
            if (new_color.length === 7 && new_color.startsWith('#')) {
                for (const c of Object.keys(Colors)) {
                    if (Colors[c].rgb === new_color.toLowerCase()) {
                        this.color = c;
                        return;
                    }
                }
            } else {
                for (const c of Object.keys(Colors)) {
                    if (Colors[c].name === new_color.toLowerCase()) {
                        this.color = c;
                        return;
                    }
                }
            }
        }
    }

    static getRandom() {
        return new TwitchColor(Object.keys(Colors)[Math.floor(Math.random() * 15)]);
    }

    getRGB() {
        return Colors[this.color].rgb;
    }

    getName() {
        return Colors[this.color].name;
    }

}

let channels = [
    'andrewkraevskii',
    'Rudniy_',
]

channels = channels.map((item) => item.toLowerCase())

const client = new tmi.Client({
    options: {
        debug: true,
        joinInterval: 300,
    },
    connection: {
        secure: true,
        reconnect: true,
    },
    identity: {
        username: process.env.BOTNAME,
        password: process.env.TOKEN,
    },
    channels: channels,
});

client.applyColor = function(channel, color) {
    console.log(color);
    this.say(channel, `/color ${color.getName()}`);
}

client.connect();


let commandsClass = {};

client.on("connected", (address, port) => {
    reload_command_settings();
    reload_active_commands();
    for (let channel of channels) {
        client.channelsInfo = {
            ...client.channelsInfo,
            [channel]: { 'messages': [] }
        };
    }
});



function reload_command_settings() {
    commandsClass = JSON.parse(fs.readFileSync('./commands/commands.json'));
    activeCommandsList = Object.keys(commandsClass).filter((item) => commandsClass[item].active);
    console.log(activeCommandsList);
}

function reload_active_commands() {
    client.commands = {}

    for (const commandName of activeCommandsList) {
        const commandClass = require(`./commands/${commandName}.js`);
        client.commands[commandName] = {
            ...commandClass,
            ...commandsClass[commandName]
        }
    }
}





client.on('message', (channel, tags, message, self) => {
    console.log(tags);
    if (self) return; // не отвечаем на собственные сообщения

    if (message.startsWith(process.env.PREFIX)) {
        message = message.slice(process.env.PREFIX.length); // удаляем префикс команды

        commandName = message.split(/ +/)[0]; // получаем имя команды
        if (client.commands[commandName] === undefined) {
            console.log('команда не найдена');
            return;
        }

        // try {
        console.log(message);
        client.commands[commandName].execute(client, channel, tags, message.slice(commandName.length).trim());
        console.log(commandName);

        // } catch {

        // }

    }
});
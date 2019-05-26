const Discord = require('discord.js');
const conf = require('./json-library/atlasConf.json');
const fs = require("fs");

const atlas = new Discord.Client({disableEveryone: true});

atlas.commands = new Discord.Collection();

let cooldown = new Set();
const queue = new Map();

fs.readdir(conf.commandsPath, (error, folders) => {
    if (error) {
        console.log(error);
        return;
    }
    folders.forEach(function (folder) {
        fs.readdir(conf.commandsPath + folder, (error, files) => {
            if (error) {
                console.log(error);
                return;
            }
            let jsfile = files.filter(f => f.split(".").pop() === "js");
            if (jsfile === undefined || jsfile.length <= 0) {
                console.log(`Couldn't find any commands in folder [${folder}]`);
                return
            }

            jsfile.forEach((f, i) => {
                let props = require(conf.commandsPath + folder + `/${f}`);
                console.log(`${f} loaded!`);
                atlas.commands.set(props.help.name, props);
            });
        });
    })
});

atlas.login(conf.token);

atlas.on('ready', () => {
    console.log(`Logged in as ${atlas.user.tag}!`);
    atlas.user.setActivity(`Type ${conf.prefix}help`, {type: 'PLAYING'});
});

atlas.on('reconnecting', () => {
    console.log('Reconnecting!');
});

atlas.on('disconnect', () => {
    console.log('Disconnect!');
});

atlas.on('message', message => {
    if (message.author.bot) return; //Avoid bot self message loop
    if(message.author.type === 'bot') return; //Avoid other bots triggering this one
    if (message.channel.type === 'dm') return; //Avoid DMs for now

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let arguments = messageArray.slice(1);

    let prefixArray = JSON.parse(fs.readFileSync("./json-library/prefixList.json", "utf8"));

    if(!prefixArray[message.guild.id]) {
        prefixArray[message.guild.id] = {
            prefix: conf.prefix
        };
    }

    let prefix = prefixArray[message.guild.id].prefix;

    console.log(cooldown);
    if (!command.startsWith(prefix)) return; //Command didnt start with prefix

    if(cooldown.has(message.author.id)) {
        message.delete(2000);
        message.reply("You have to wait 5 seconds between commands.").then(msg => msg.delete(3000));
        return;
    }
    if(!message.member.hasPermission("ADMINISTRATOR")) { //stop command spam
        cooldown.add(message.author.id);
    }

    let commandFile = atlas.commands.get(command.slice(prefix.length));
    if (commandFile) {
        console.log(queue);
        if(command.slice(prefix.length).startsWith("dj")) { //handle music commands differently
            commandFile.run(atlas, message, arguments, prefix, queue);
        } else {
            commandFile.run(atlas, message, arguments, prefix);
        }

    }

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, conf.cdseconds * 1000);
});


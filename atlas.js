const Discord = require('discord.js');
const conf = require('./atlasConf.json');
const help = require('./help.json');

const atlas = new Discord.Client({disableEveryone: true});

const prefix = conf.prefix;

atlas.login(conf.token);

atlas.on('ready', () => {
    console.log(`Logged in as ${atlas.user.tag}!`);
    atlas.user.setActivity(`Type ${prefix}help`, {type: 'playing'});
});

atlas.on('message', message => {
    if(message.author.bot) return; //Avoid bot self message loop
    if(message.channel.type === "dm") return; //Ignore Direct Message

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let arguments = messageArray.slice(1);

    if(command === `${prefix}ping`) return message.reply("Pong!");

    if(command === `${prefix}help`) {
        if (arguments === undefined || arguments.length === 0) {
            let description = "";
            for (command in help.commands) {
                description = description + `\`${prefix}${command}\`` + ' - ' + help.commands[command]['simple'] + '\n';
            }

            let helpEmbed = new Discord.RichEmbed()
                .setAuthor("Command List", atlas.user.avatarURL)
                .setColor("#bfbfbf")
                .setDescription(description)
                .setFooter("Atlas here, ready for your command!", atlas.user.avatarURL);

            message.reply("I have sent you a list of my commands in a Direct Message.");
            return message.author.send(helpEmbed);
        }
    }

    if(command === `${prefix}botinfo`) {
        let botIcon = atlas.user.avatarURL;
        let botEmbed = new Discord.RichEmbed()
            .setColor("#15f153")
            .setThumbnail(botIcon)
            .addField("Name", atlas.user.tag)
            .addField("Created on", atlas.user.createdAt);

        return message.channel.send(botEmbed);
    }

    if(command === `${prefix}serverinfo`) {
        let onlineCount = message.guild.members.filter(m => m.presence.status === 'online').size;
        let serverIcon = message.guild.iconURL;
        let serverEmbed = new Discord.RichEmbed()
            .setColor("#009933")
            .setThumbnail(serverIcon)
            .addField("Server Name", message.guild.name)
            .addField("Created on", message.guild.createdAt)
            .addField("Members currently online", onlineCount)
            .addField("Total Members", message.guild.memberCount);

        return message.channel.send(serverEmbed);
    }
});


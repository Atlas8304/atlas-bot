const Discord = require("discord.js");
const fs = require("fs");
const conf = require('../../json-library/atlasConf.json');
const help = require('../../json-library/help.json');

module.exports.run = (atlas, message, arguments) => {

    let prefixArray = JSON.parse(fs.readFileSync("/home/john/atlas-bot/json-library/prefixList.json", "utf8"));

    if(!prefixArray[message.guild.id]) {
        prefixArray[message.guild.id] = {
            prefix: conf.prefix
        };
    }

    if (arguments === undefined || arguments.length === 0) {
        let helpEmbed = new Discord.RichEmbed()
            .setAuthor("Command List", atlas.user.avatarURL)
            .setColor("#bfbfbf")
            .setFooter("Atlas here, ready for your command!", atlas.user.avatarURL);
        for (commandCategory in help) {
            console.log(commandCategory);
            let description = "";
            for (command in help[commandCategory]) {
                console.log(command);
                description = description + `\`${prefixArray[message.guild.id].prefix}${command}\`` + ' - *' + help[commandCategory][command]['simple'] + '*\n';
            }
            helpEmbed.addField(commandCategory, description);
        }

        message.reply("I have sent you a list of my commands in a Direct Message.");
        message.author.send(helpEmbed);
    }
};

module.exports.help = {
    name: "help"
};


const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (atlas, message, arguments, prefix) => {

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Only Users/Roles with [Manage Server] permission can edit server prefix.");
    if(arguments === undefined || arguments.length === 0) return message.reply(`Please specify a prefix to change to, for help with this command, use \`${prefix}help changeprefix\``);

    let prefixArray = JSON.parse(fs.readFileSync("/home/john/atlas-bot/json-library/prefixList.json", "utf8"));

    if(!prefixArray[message.guild.id]) {
        prefixArray[message.guild.id] = {
            prefix: prefix
        };
    }

    prefixArray[message.guild.id] = {
        prefix: arguments[0]
    };

    fs.writeFile("/home/john/atlas-bot/json-library/prefixList.json", JSON.stringify(prefixArray), (err) => {
        if (err) console.log(err);
    });

    let sEmbed = new Discord.RichEmbed()
        .setColor("#FF9900")
        .setTitle("Prefix Set!")
        .setDescription(`This servers prefix has been set to \`${arguments[0]}\``);

    message.channel.send(sEmbed);
};

module.exports.help = {
    name: "changeprefix"
};
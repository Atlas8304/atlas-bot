const Discord = require("discord.js");

module.exports.run = (atlas, message, arguments, prefix) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Only Users/Roles with [Manage Messages] permission can execute this command.");
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I need [Manage Messages] permission to clear messages.");
    if(arguments === undefined || arguments.length === 0) return message.reply(`Please specify a number of messages to delete, i.e:-  \`${prefix}clear 2\``);

    let cleared;

    if(arguments[0] > 100) { //bulkDelete throws Errors if value is over 100
        cleared = 100;
        arguments[0] = 100;
    } else if (arguments[0] < 100) {
        cleared = arguments[0];
        arguments[0]++;
    } else cleared = arguments[0];

    message.channel.bulkDelete(arguments[0]).then(() => { // +1 as bulkDelete ALSO includes the command you types to trigger this
        message.channel.send(`Cleared ${cleared} messages from #${message.channel.name}`).then(msg => msg.delete(5000));
    });
};

module.exports.help = {
    name: "clear"
};
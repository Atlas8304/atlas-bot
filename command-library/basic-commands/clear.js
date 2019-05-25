const Discord = require("discord.js");

module.exports.run = (atlas, message, arguments, prefix) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Only Users/Roles with [Manage Messages] permission can execute this command.");
    if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I need [Manage Messages] permission to clear messages.");
    if(arguments === undefined || arguments.length === 0) return message.reply(`Please specify a number of messages to delete, i.e:-  \`${prefix}clear 2\``);

    message.channel.bulkDelete(arguments[0]+1).then(() => { // +1 as bulkDelete ALSO includes the command you types to trigger this
        message.channel.send(`Cleared ${arguments[0]} messages from #${message.channel.name}`).then(msg => msg.delete(5000));
    });
};

module.exports.help = {
    name: "clear"
};
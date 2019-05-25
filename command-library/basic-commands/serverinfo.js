const Discord = require("discord.js");

module.exports.run = (atlas, message, arguments, prefix) => {
    let onlineCount = message.guild.members.filter(m => m.presence.status === 'online').size;
    let serverIcon = message.guild.iconURL;
    let serverEmbed = new Discord.RichEmbed()
        .setColor("#009933")
        .setThumbnail(serverIcon)
        .addField("Server Name", message.guild.name)
        .addField("Created on", message.guild.createdAt)
        .addField("Members currently online", onlineCount)
        .addField("Total Members", message.guild.memberCount);

    message.channel.send(serverEmbed);
};

module.exports.help = {
    name: "serverinfo"
};
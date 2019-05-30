const Discord = require("discord.js");

module.exports = {
    name: 'serverinfo',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['serverinfo', 'sinfo', 'guildinfo', 'ginfo'],
    usage: '+serverinfo',
    async run (atlas, message, params, guildInfo) {
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
    }
};
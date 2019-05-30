const Discord = require("discord.js");

module.exports = {
    name: 'botinfo',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['botinfo', 'binfo', 'atlasinfo', 'ainfo'],
    usage: '+botinfo',
    async run (atlas, message, params, guildInfo) {
        let botIcon = atlas.user.avatarURL;
        let botEmbed = new Discord.RichEmbed()
            .setColor("#15f153")
            .setThumbnail(botIcon)
            .addField("Name", atlas.user.tag)
            .addField("Created on", atlas.user.createdAt);

        message.channel.send(botEmbed);
    }
};
const Discord = require("discord.js");

module.exports.run = (atlas, message, arguments) => {
    let botIcon = atlas.user.avatarURL;
    let botEmbed = new Discord.RichEmbed()
        .setColor("#15f153")
        .setThumbnail(botIcon)
        .addField("Name", atlas.user.tag)
        .addField("Created on", atlas.user.createdAt);

    message.channel.send(botEmbed);
};

module.exports.help = {
    name: "botinfo"
};
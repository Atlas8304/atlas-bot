const Discord = require("discord.js");
const guildsDB = require('../../lib/mongodb'); //Build 'guilds' table schema

module.exports = {
    name: 'changeprefix',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['changeprefix', 'cprefix'],
    usage: '+changeprefix [prefix]',
    async run(atlas, message, params, guildInfo) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("Only Users/Roles with [Manage Server] permission can edit server prefix.");
        if (params === undefined || params.length === 0) return message.reply(`Please specify a prefix to change to, for help with this command, use \`${guildInfo.prefix}help changeprefix\``);

        guildsDB.findOneAndUpdate(
            {guildID: message.guild.id},
            {prefix: params[0]}, (err, doc) => {
                let sEmbed = new Discord.RichEmbed()
                    .setColor("#FF9900")
                    .setTitle("Prefix Set!")
                    .setDescription(`This servers prefix has been set to \`${params[0]}\``);

                message.channel.send(sEmbed);
            }).catch(err => console.error(err));
    }
};
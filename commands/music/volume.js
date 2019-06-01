const Discord = require("discord.js");
const guildsDB = require('../../lib/mongodb'); //Build 'guilds' table schema

module.exports = {
    name: 'djvolume',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['djvolume', 'volume'],
    usage: '+djvolume [number]',
    async run (atlas, message, params, guildInfo) {
        let serverQueue = atlas.queue.get(message.guild.id);
        let voiceChannel = message.member.voiceChannel;
        let botChannel = message.guild.me.voiceChannel;

        if (!voiceChannel) {
            message.delete(2000);
            message.reply('You need to be in a voice channel to change volume!').then(msg => msg.delete(5000));
            return ;
        }
        if (!botChannel) {
            message.delete(2000);
            message.reply('I need to be in a voice channel to change volume!').then(msg => msg.delete(5000));
            return ;
        }
        if (voiceChannel !== botChannel) {
            message.delete(2000);
            message.reply('I need to be in the same channel as you to allow usage of this command.').then(msg => msg.delete(5000));
            return ;
        }

        if (!serverQueue) {
            message.delete(2000);
            message.reply('There is no song to change volume of!').then(msg => msg.delete(5000));
            return ;
        }

        if(params === undefined || isNaN(params[0] || params[0]) > 200) return message.reply(`Please specify a valid volume.`);

        let volume = params[0] / 100;
        serverQueue.connection.dispatcher.setVolume(volume);
        serverQueue.volume = volume;

        guildsDB.findOneAndUpdate(
            {guildID: message.guild.id},
            {volume: volume}, (err, doc) => {
                message.channel.send(`**Volume set to** \`${params[0]}%\``);
            }).catch(err => console.error(err));


    }
};
const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (atlas, message, arguments, prefix, queue) => {
    let serverQueue = queue.get(message.guild.id);
    let voiceChannel = message.member.voiceChannel;
    let botChannel = message.guild.me.voiceChannel;

    if (!voiceChannel) {
        message.delete(2000);
        message.reply('You need to be in a voice channel to skip music!').then(msg => msg.delete(5000));
        return ;
    }
    if (!botChannel) {
        message.delete(2000);
        message.reply('I need to be in a voice channel to skip music!').then(msg => msg.delete(5000));
        return ;
    }
    if (voiceChannel !== botChannel) {
        message.delete(2000);
        message.reply('I need to be in the same channel as you to allow usage of this command.').then(msg => msg.delete(5000));
        return ;
    }

    if (!serverQueue) {
        message.delete(2000);
        message.reply('There is no song to skip!').then(msg => msg.delete(5000));
        return ;
    }
    serverQueue.connection.dispatcher.end();
};

module.exports.help = {
    name: "djskip"
};
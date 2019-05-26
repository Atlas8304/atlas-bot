const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (atlas, message, arguments, prefix, queue) => {
    let serverQueue = queue.get(message.guild.id);
    let voiceChannel = message.member.voiceChannel;
    let botChannel = message.guild.me.voiceChannel;

    if (botChannel === undefined || !botChannel) {
        return message.reply('I am not in a voice channel!');
    }

    if(serverQueue === undefined) { //if for some reason bot goes down on server and still shows as connected to a voice server

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: false,
        };

        queue.set(message.guild.id, queueConstruct);

        queueConstruct.connection = await voiceChannel.join();
        serverQueue = queue.get(message.guild.id);
    }

    queue.delete(message.guild.id);
    serverQueue.voiceChannel.leave();

    return message.channel.send(`Leaving \`${botChannel.name}\`!`);
};

module.exports.help = {
    name: "djleave"
};
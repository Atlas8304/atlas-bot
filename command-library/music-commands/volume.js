const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (atlas, message, arguments, prefix, queue) => {
    let serverQueue = queue.get(message.guild.id);
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

    if(arguments === undefined || isNaN(arguments[0] || arguments[0]) > 200) return message.reply(`Please specify a valid volume.`);

    let volume = arguments[0] / 100;
    serverQueue.connection.dispatcher.setVolume(volume);
    serverQueue.volume = volume;

    let volumeArray = JSON.parse(fs.readFileSync("/home/john/atlas-bot/json-library/musicVolume.json", "utf8"));
    volumeArray[message.guild.id] = {
        prefix: 0.5
    };
    fs.writeFile("/home/john/atlas-bot/json-library/musicVolume.json", JSON.stringify(volumeArray), (err) => {
        if (err) console.log(err);
    });

    message.channel.send(`**Volume set to** \`${arguments[0]}%\``);
};

module.exports.help = {
    name: "djvolume"
};
module.exports = {
    name: 'djleave',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['djleave', 'leave', 'banish'],
    usage: '+djleave',
    async run (atlas, message, params, guildInfo) {
        let serverQueue = atlas.queue.get(message.guild.id);
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

            atlas.queue.set(message.guild.id, queueConstruct);

            queueConstruct.connection = await voiceChannel.join();
            serverQueue = atlas.queue.get(message.guild.id);
        }

        serverQueue.voiceChannel.leave();
        atlas.queue.delete(message.guild.id);

        return message.channel.send(`Leaving \`${botChannel.name}\`!`);
    }
};
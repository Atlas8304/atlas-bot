module.exports = {
    name: 'djjoin',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['djjoin', 'join', 'summon'],
    usage: '+djjoin',
    async run (atlas, message, params, guildInfo) {
        let voiceChannel = message.member.voiceChannel;
        let botChannel = message.guild.me.voiceChannel;

        if (!message.guild.me.hasPermission('CONNECT')) {
            return message.reply('I need the permissions [Connect] to join a voice channel!');
        }

        if (voiceChannel === botChannel) {
            message.delete(2000);
            message.reply(`I am already in \`${voiceChannel.name}\``).then(msg => msg.delete(5000));
            return ;
        }

        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: guildInfo.volume,
            playing: false,
        };

        atlas.queue.set(message.guild.id, queueConstruct);

        try {
            queueConstruct.connection = await voiceChannel.join();
            message.channel.send(`Joined \`${voiceChannel.name}\`, music commands bound to \`#${message.channel.name}\``);
        } catch (err) {
            console.log(err);
            atlas.queue.delete(message.guild.id);
            return message.channel.send(err);
        }
    }
};
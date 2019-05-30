module.exports = {
    name: 'djskip',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['djskip', 'skip', 'next', 'nextsong'],
    usage: '+djskip',
    async run (atlas, message, params, guildInfo) {
        let serverQueue = atlas.queue.get(message.guild.id);
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
    }
};
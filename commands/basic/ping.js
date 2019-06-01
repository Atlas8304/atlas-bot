module.exports = {
    name: 'ping',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['ping'],
    usage: '+ping',
    async run (atlas, message, params, guildInfo) {
        message.reply("Pong!");
    }
};
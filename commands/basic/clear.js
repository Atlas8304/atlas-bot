module.exports = {
    name: 'clear',
    description: 'A simple ping to the bot to see if it will respond.',
    aliases: ['clear', 'purge', 'clean'],
    usage: '+clear [number]',
    async run (atlas, message, params, guildInfo) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Only Users/Roles with `[Manage Messages]` permission can execute this command.");
        if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply("I need `[Manage Messages]` permission to clear messages.");
        if(params === undefined || params.length === 0 || isNaN(params[0])) return message.reply(`Please specify a number of messages to delete, i.e:-  \`${guildInfo.prefix}clear 2\``);

        let cleared;

        if(params[0] > 100) { //bulkDelete throws Errors if value is over 100
            cleared = 100;
            params[0] = 100;
        } else if (params[0] < 100) {
            cleared = params[0];
            params[0]++;
        } else cleared = params[0];

        message.channel.bulkDelete(params[0]).then(() => { // +1 as bulkDelete ALSO includes the command you types to trigger this
            message.channel.send(`Cleared ${cleared} messages from #${message.channel.name}`).then(msg => msg.delete(5000));
        });
    }
};
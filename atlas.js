const Discord = require('discord.js'); //Module Requires
const Mongoose = require('mongoose');

const atlas = new Discord.Client({disableEveryone: true}); //Bot Client Init.

atlas.commands = new Discord.Collection(); //Command Collection Init
atlas.aliases = new Discord.Collection(); //Command Alias Collection Init
atlas.queue = new Map(); //Init queue map for music functionality

const autoload = require('./lib/autoload'); //Autoload all commands into atlas.commands collection
const priv = require('./json/private.json'); //Include private info i.e:- token, DB info
const conf = require('./json/config.json'); //Include standard bot configurations
const guildsDB = require('./lib/mongodb'); //Build 'guilds' table schema

autoload.autoload(atlas);

Mongoose.connect(`mongodb://${priv.dbuser}:${priv.dbpwd}@localhost:27017/atlas`,
    {useNewUrlParser: true,
    useFindAndModify: false}) //Create DB connection
    .catch(err => console.error(err));

atlas.login(priv.token) //Send login Token to log into discord
    .catch(error => console.log(error));

atlas.on('ready', async () => { //Emitted when the client becomes ready to start working
    await atlas.guilds.keyArray().forEach((id) => {
        guildsDB.findOne({guildID: id}, (err, guildInfo) => {
            if (guildInfo) return;

            let newGuild = new guildsDB({
                guildID: id,
                prefix: conf.prefix,
                volume: 1
            });

            return newGuild.save();
        }).catch(err => console.error(err))
    });
    console.log(`Logged in as ${atlas.user.tag} on ${atlas.guilds.size} servers!`);
    atlas.user.setActivity(`Type ${conf.prefix}help`, {type: 'PLAYING'})
        .catch(error => console.log(error));
});

atlas.on('message', async (message) => { //Emitted whenever a message is created
    if (message.author.bot) return; //Avoid bot self message loop

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let params = messageArray.slice(1);

    guildsDB.findOne({guildID: message.guild.id}, (err, guildInfo) => {
        if (guildInfo === undefined || !guildInfo) { //Result is blank, we couldn't find the guild record
            console.error(`Could not find guild information for ID:${message.guild.id} in guilds@mongoDB`);
            return;
        }

        //TODO Rework this so we check a list of "aliases" first then run the command linked to that alias
        let commandFile = atlas.commands.get(command.slice(guildInfo.prefix.length)); //Attempt to find the command file we need
        if (commandFile === undefined || !commandFile) { //we couldn't find the command
            console.error(`Could not find file`);
            return;
        }

        commandFile.run(atlas, message, params, guildInfo);

    }).catch(err => console.error(err));
});
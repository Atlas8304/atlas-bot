const Mongoose = require('mongoose');

const config = new Mongoose.Schema({
    guildID: {type: String, required: true, dropDups: true},
    prefix: {type: String, required: true},
    volume: {type: Number}
});

config.index({guildID: 1});

module.exports = Mongoose.model('guilds', config);
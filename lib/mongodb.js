const Mongoose = require('mongoose');

const config = new Mongoose.Schema({
    guildID: String,
    prefix: String,
    volume: Number
});

module.exports = Mongoose.model('guilds', config);
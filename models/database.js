const mongoose = require('mongoose');
const shortId = require('shortid');
const DATABASE_URL = process.env.DATABASE_URL;


// Connection to database
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to DATABASE');
});


// Schema and Model
const shortURL = mongoose.model('shortUrl', new mongoose.Schema({
    full: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate

    },
    click: {
        type: Number,
        required: true,
        default: 0
    }
}));
module.exports = shortURL;
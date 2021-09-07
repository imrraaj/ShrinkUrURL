const express = require('express');
const app = express();
const shortDB = require('./models/database')


app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');


// GET end-points
app.get('/', async (req, res) => {
    const shortUrls = await shortDB.find();
    res.render('index', { shortUrls: shortUrls });
});

app.get('/:shorturl', async (req, res) => {

    const shortUrl = await shortDB.findOne({ short: req.params.shorturl });
    if (shortUrl === null) return res.sendStatus(404);
    shortUrl.click++;
    shortUrl.save();
    res.redirect(shortUrl.full);

});



// POST end-points
app.post('/short', async (req, res) => {
    await shortDB.create({ full: req.body.fullUrl })
    res.redirect('/');
});



// Staer the server
app.listen(process.env.PORT || 3000);
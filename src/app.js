const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');
const publicDir = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nadeem Ansari'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nadeem Ansari'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Nadeem Ansari'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forecast(data.latitude, data.longitude, data.location, (error, data) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: data.summary,
                location: data.location,
                address: req.query.address
            });
        });
    });
});

app.get('/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Nadeem Ansari'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
const request = require('request');

function forecast(latitude, longitude, location, callback) {
    const url = `https://api.darksky.net/forecast/36268e5c4779b7a18c30ccc56e038e18/${latitude},${longitude}`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        }
        else if (response.body.error) {
            callback('Unable to fetch weather for location. Try another location.', undefined);
        }
        else {
            callback(undefined, {
                summary: response.body.daily.summary,
                location
            });
        }
    });
};

module.exports = forecast;
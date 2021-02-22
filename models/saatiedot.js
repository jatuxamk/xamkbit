const request = require("request");
const fs = require("fs");
const cachefile = "models/cache.json";

let haeData = (url) => {

    return new Promise((resolve, reject) => {

            console.log(url);

            request(url, (err, res) => {

                    resolve(res.body);

            });

    }); 

}

module.exports = {

    haeTilanne : (callback, kaupunki) => {

        fs.readFile(cachefile, (err, data) => {

            let cache = JSON.parse(data);

            if (cache.tilanne[kaupunki]) {

                callback(cache.tilanne[kaupunki]);

            } else {

                let urli = `http://api.openweathermap.org/data/2.5/weather?q=${kaupunki},fi&units=metric&lang=fi&APPID=8cf32db5af877d14abb7f1578c548358`;

                haeData(urli).then((data) => {
                    
                    cache.tilanne[kaupunki] =JSON.parse(data);

                    fs.writeFile(cachefile, JSON.stringify(cache, null, 2), (err) => {

                        callback(JSON.parse(data));

                    });                    
        
                });

            }

        });     

    },

    haeEnnuste : (callback, kaupunki) => {

        fs.readFile(cachefile, (err, data) => {

            let cache = JSON.parse(data);

            if (cache.ennuste[kaupunki]) {

                callback(cache.ennuste[kaupunki]);

            } else {

                let urli = `http://api.openweathermap.org/data/2.5/forecast?q=${kaupunki},fi&units=metric&lang=fi&APPID=8cf32db5af877d14abb7f1578c548358`;

                haeData(urli).then((data) => {
                    
                    cache.ennuste[kaupunki] = JSON.parse(data);

                    fs.writeFile(cachefile, JSON.stringify(cache, null, 2), (err) => {

                        callback(JSON.parse(data));

                    });                    
        
                });

            }

        });     

    }

}
const express = require("express");
const app = express();
const portti = process.env.PORT || 3000;

const uutiset = require("./models/iltalehti");
const saatiedot = require("./models/saatiedot");
const valuutat = require("./models/valuutat");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
  
app.set('json spaces', 2);

app.get("/uutiset/:kategoria?", (req, res) => {

    uutiset.haeUutiset((data) => {

        res.json(data);

    }, req.params.kategoria);

});

app.get("/saatilanne/:kaupunki?", (req, res) => {

    let kaupunki = "mikkeli";

    if (req.params.kaupunki) {

        kaupunki = req.params.kaupunki.toLowerCase();

    }

    saatiedot.haeTilanne((data) => {

        res.json(data);

    }, kaupunki);

});

app.get("/saaennuste/:kaupunki?", (req, res) => {

    let kaupunki = "mikkeli";

    if (req.params.kaupunki) {

        kaupunki = req.params.kaupunki.toLowerCase();

    }

    saatiedot.haeEnnuste((data) => {

        res.json(data);

    }, kaupunki);

});

app.get("/valuutat", (req, res) => {


    valuutat.haeValuutat((data) => {

        res.json(data);

    });

});

app.listen(portti, () => {
    
    console.log(`Palvelin käynnistyi porttiin ${portti}`);
    
});
const request = require("request");
const parser = require("xml2js").Parser();

let haeFeed = (url, lahde) => {

    return new Promise((resolve, reject) => {

            console.log(url);

            request(url, (err, res) => {

                let uutiset = []; 

                parser.parseString(res.body, (err, result) => { 
                    
                    let i = 0;

                    for (i=0;i<20;i++) {

                        let pubDate = new Date(result.rss.channel[0].item[i].pubDate[0]);

                        let pvm = `${pubDate.getDate()}.${(pubDate.getMonth() + 1)}.${pubDate.getFullYear()}`;

                        let minuutit = (pubDate.getMinutes() < 10)?"0"+pubDate.getMinutes():pubDate.getMinutes();

                        let aika = `${pubDate.getHours() + 2}:${minuutit}`;

                        let aikaleima = pubDate.getTime();

                        let kuva = "img/eikuvaa.png";

                        if (result.rss.channel[0].item[i].enclosure) {

                            kuva = result.rss.channel[0].item[i].enclosure[0].$.url;
                        }

                        let uutinen = {
                                        otsikko : result.rss.channel[0].item[i].title[0],
                                        sisalto : result.rss.channel[0].item[i].description[0],
                                        linkki : result.rss.channel[0].item[i].link[0],
                                        kuva : kuva,
                                        pvm : pvm + " " + aika,
                                        aikaleima : aikaleima
                                    }
                        
                        uutiset.push(uutinen);

                        

                    }
   
                    resolve(uutiset);

                });

            }); 

    }); 

}

module.exports = {

    haeUutiset : (callback, kategoria) => {

        console.log(kategoria);

        let urli = "https://www.iltalehti.fi/rss/rss.xml";

        if (kategoria == "uusimmat") {
            urli = "https://www.iltalehti.fi/rss/rss.xml";
        }

        if (kategoria == "yleiset") {
            urli = "https://www.iltalehti.fi/rss/uutiset.xml";
        }

        if (kategoria == "urheilu") {
            urli = "https://www.iltalehti.fi/rss/urheilu.xml";
        }

        if (kategoria == "viihde") {
            urli = "https://www.iltalehti.fi/rss/viihde.xml";
        }

        if (kategoria == "terveys") {
            urli = "https://www.iltalehti.fi/rss/terveys.xml";
        }

        if (kategoria == "matkailu") {
            urli = "https://www.iltalehti.fi/rss/matkailu.xml";
        }

        if (kategoria == "digi") {
            urli = "https://www.iltalehti.fi/rss/digi.xml";
        }

        let feedit = [
                        haeFeed(urli, "Iltalehti")
                     ];

        let kaikkiUutiset = [];

        Promise.all(feedit).then((uutiset) => {

            uutiset.forEach((uutinen) => {

                kaikkiUutiset = kaikkiUutiset.concat(uutinen);

            });

            kaikkiUutiset.sort((a,b) => {

                if (a.aikaleima >= b.aikaleima) {

                    return -1;
                    
                } else {

                    return 1;
                }

            });
            
            callback(kaikkiUutiset);

        })
      

    }

}
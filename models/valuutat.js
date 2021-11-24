const request = require("request");
const fs = require("fs");
const cachefile = "models/cache_valuutat.json";

let haeData = (url) => {

    return new Promise((resolve, reject) => {

            console.log(url);

            request(url, (err, res) => {

                    resolve(res.body);

            });

    }); 

}

module.exports = {

    haeValuutat : (callback) => {

        fs.readFile(cachefile, (err, data) => {

            let cache = JSON.parse(data);

            let aikanyt = new Date();

            if (cache.date === `${aikanyt.getFullYear()}-${(aikanyt.getMonth()+1)}-${aikanyt.getDate()}`) {

                callback(cache);

            } else {

                let urli = `http://data.fixer.io/api/latest?access_key=7dc78b8ae6468032edba80f49ce1cbbe`;

                haeData(urli).then((data) => {
                    
                    try {

                        let cachetesti = JSON.parse(data);

                        if (cachetesti.success === true) {

                            cache = cachetesti;

                            fs.writeFile(cachefile, JSON.stringify(cache, null, 2), (err) => {
    
                                callback(cache);
        
                            }); 

                        } else {

                            callback(cache);
        
                        }                           

                    } catch (e) {

                        callback(cache);

                    }

                
        
                });

            }

        });     

    }

}
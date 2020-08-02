const scrapping = require('./scrapping')
const fs = require('fs')
const entidades = require('./entidades.json')


scrapping().then(data => {
    fs.writeFile('./entidades.json', JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
            return
        }
        console.log('Feito')
        console.log(entidades.map(e => e))
    })
})



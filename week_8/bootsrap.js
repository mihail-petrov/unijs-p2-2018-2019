const express = require('express');
const bodyParser = require('body-parser');

const app     = express();
const PORT    = 3012;
const db      = require('./db/mydb');

const translate = (lang, code) => {

    const TRANSLATE_COLLECTION = {

        "SUCCESS" : {
            "bg" : "Заявката е успешно съхранена",
            "en" : "Success stored in database"
        },

        "ERROR" : {
            "bg" : "Нещо много се обърка",
            "en" : "Something whent wrong"
        }        
    }

    return TRANSLATE_COLLECTION[code][lang];
}



// Use Middleware
app.use(bodyParser.json());

// db.insert('books', {
//     title   : 'Test',
//     author  : 'Mihail'
// });

// var collection = db.select('books');
// console.log(collection);

// var whereCollection = db.select('books', {
//     'author' : 'Todor'
// });

// console.log(whereCollection);


/**
 * @endpoint : /
 * @method   : GET
 * @description : Get the main information
 */
app.get('/', (req, res) => {
    res.status(400).send('Hello world');
});

// BOOK group
app.get('/books', (req, res) => {
    
    var bookCollection = db.select('books');
    
    res.status(200).send({
        message     : 'Success fetch',
        collection  : bookCollection
    });
});


app.post('/books', (req, res) => {
    
    var lang = req.header('lang');

    if(!req.body.title) {
        return res.status(405).send({
            message : translate(lang, 'ERROR')
        })
    }

    if(req.body.isbn.length > 15) {

        return res.status(405).send({
            message : translate(lang, 'ERROR')
        })
    }

    var record = db.insert('books', req.body);

    res.status(200).send({
        message     : translate(lang, 'SUCCESS'),
        collection  : [record]
    })
});




app.listen(PORT, () => {
    console.log(`Application server running on ... ${PORT}`);
});
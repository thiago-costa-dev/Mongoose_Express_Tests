const config = require('config');
const mongoose = require('mongoose');
const express = require('express');

const db = config.get('mongoURI');
const app = express();

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Mongoose is running...'); })
    .catch(err => { console.log(err); });

const Animals = require('./models/Animals');

Animals.find({})
    .then(items => { 
        let string = '';
        for (item of items) {
            string += `${item.name} is${item.isEndangered ? '' : ' not'} endangered!`;
        }

        app.get('/', (req, res) => {
            res.send(string);
        });
    })
    .catch(err => { console.log(err); })
    .then(() => { mongoose.disconnect();  });



app.listen(3000, () => { console.log("It's running on port 3000..."); });

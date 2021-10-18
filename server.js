const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

const db = config.get("mongoURI");

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Mongoose is running...") })
    .catch((err) => { console.log(err) });

const Animal = require('./models/Animals');

const newAnimal1 = new Animal({name: 'panda', isEndangered: false});
newAnimal1.save()
    .then(item => { 
        console.log(item);
        mongoose.disconnect(); 
    })
    .catch(err => { console.log(err); });


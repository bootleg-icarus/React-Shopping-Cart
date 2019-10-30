const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

let db = mongoose.connection;
db.once('open', function() {
    let ourSchema = new mongoose.Schema({
        id: Number,
        count: Number
    });
    let ourModel = mongoose.model('cart', ourSchema);
    const app = express();
    app.use(cors());

    app.get('/get-data', (req,res)=>{
        ourModel.find({}, function(err,docs) {
            res.send(docs);
        });
    })

    app.post('/post-data', bodyParser.json(), (req,res)=>{
        console.log(req.body.id);
        ourModel.update({id:req.body.id},  {$inc : {count: 1}} , {upsert: true}, function(err,res) {
            console.log(res);
        })
    })
    app.post('/remove-item', bodyParser.json(), (req,res)=>{
        console.log(req.body.id);
        ourModel.find({id:req.body.id}).remove( (err,docs)=> {
            if(err)
                console.log(err);
            console.log(docs);
        })
    })
    app.post('/subtract-count', bodyParser.json(), (req,res)=>{
        console.log(req.body.id);
        ourModel.update({id:req.body.id},  {$inc : {count: -1}} , function(err,res) {
            console.log(res);
        })
    })
    app.post('/add-count', bodyParser.json(), (req,res)=>{
        console.log(req.body.id);
        ourModel.update({id:req.body.id},  {$inc : {count: 1}} , function(err,res) {
            console.log(res);
        })
    })
    app.listen(3002, () => console.log('Express started at port 3002'));
});


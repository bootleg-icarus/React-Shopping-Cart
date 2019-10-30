const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

let db = mongoose.connection;
db.once('open', function() {
    let cartSchema = new mongoose.Schema({
        id: Number,
        count: Number
    });
    let cartModel = mongoose.model('cart', cartSchema);
    const app = express();
    app.use(cors());

    app.get('/get-data', (req,res)=>{
        cartModel.find({}, function(err,docs) {
            res.send(docs);
        });
    })

    app.post('/post-data', bodyParser.json(), (req,res)=>{
        console.log(req.body.id);
        cartModel.update({id:req.body.id},  {$inc : {count: 1}} , {upsert: true}, function(err,docs) {
            if(err)
                console.log(err)
            else{
                console.log(docs);
                res.send('Inserted');
            }                
        })        
    })
    app.post('/remove-item', bodyParser.json(), (req,res)=>{
        console.log(req.body.id);
        cartModel.find({id:req.body.id}).remove( (err,docs)=> {
            if(err)
                console.log(err);
            else{
                console.log(docs);
                res.send('Removed');
            }
        })
    })
    app.post('/subtract-count', bodyParser.json(), (req,res)=>{
        console.log(req.body.id);
        cartModel.update({id:req.body.id},  {$inc : {count: -1}} , function(err,docs) {
            if(err)
                console.log(err)
            else{
                console.log(docs);
                res.send('Inserted');
            }
        })
    })
    app.post('/add-count', bodyParser.json(), (req,res)=>{
        console.log(req.body.id);
        cartModel.update({id:req.body.id},  {$inc : {count: 1}} , function(err,docs) {
            if(err)
                console.log(err)
            else{
                console.log(docs);
                res.send('Inserted');
            }
        })
    })
    app.listen(3002, () => console.log('Express started at port 3002'));
});


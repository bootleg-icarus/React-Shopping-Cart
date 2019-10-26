const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongo = require('mongodb');

const mongoClient = mongo.MongoClient;
let client = new mongoClient('mongodb://localhost:27017/mern', {useNewUrlParser: true}, { useUnifiedTopology: true });
let connection;

client.connect((err,db)=>{
    if(err){
        console.log('Something went wrong');
    }
    connection = db;
});

const app = express();
app.use(cors());

app.get('/get-data', (req,res)=>{
    let collection_instance = connection.db('mern').collection('mern');
    collection_instance.find().toArray((err,docs)=>{
        if(err){
            console.log("Something went wrong");
        }
        else{
            res.send(docs);
        }
    })
})
let insertedIds = [];
let dbInsertId = {};
app.post('/post-data', bodyParser.json(), (req,res)=>{
    index = insertedIds.findIndex( (id) => id === req.body.id)
    if( index === -1) {
        insertedIds.push(req.body.id);        
        let collection_instance = connection.db('mern').collection('mern');
        console.log(req.body);	
        

        collection_instance.updateOne(
            {id: 1},
            {
                $set : req.body,
            },
            {upsert: true}
        );

        }
        
        
    else{
        // let collection_instance = connection.db('mern').collection('mern');
	    // console.log(req.body);	
        // collection_instance.insertOne(req.body, (err,records)=>{
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         res.send({ status: "Inserted"});
        //     }
        // });
    }
    console.log(insertedIds);
    
    
    
    
})
app.listen(3002, () => console.log('Express started at port 3002'));

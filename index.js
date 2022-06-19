const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
require('dotenv').config();
const cors = require('cors');
const query = require('express/lib/middleware/query');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_PASS}@cluster0.9vkhq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        await client.connect();
        const collection = client.db("agency").collection("services");
        const bookingCollection = client.db("agency").collection("booking");
        const userCollection = client.db("agency").collection("user");
        console.log('connected');
        //booking:
        app.post('booking', async (req, res) => {

        })


        //user:
        app.post('/user', async (req, res) => {

            const user = await userCollection.insertOne(req.body);
        })
        app.get('/user', async (req, res) => {
            const result = await userCollection.find({}).toArray();
            res.json(result);
        })



        //services:
        app.get('/services', async (req, res) => {
            // query = {};
            const result = await collection.find().toArray();
            res.send(result);
        })

    }
    finally {

    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Innovative agency is running!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
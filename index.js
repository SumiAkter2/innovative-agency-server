const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const orderCollection = client.db("agency").collection("order");
        const reviewCollection = client.db("agency").collection("review");
        const userCollection = client.db("agency").collection("user");

        console.log('connected');

        //product:
        app.post("/services", async (req, res) => {
            const result = await collection.insertOne(req.body);
            res.json(result);
        });
        //order:
        app.post("/review", async (req, res) => {
            const result = await reviewCollection.insertOne(req.body);
            res.json(result);
        });
        app.get('/review', async (req, res) => {
            const result = await reviewCollection.find({}).toArray();
            res.json(result);
        })
        //booking:
        app.post("/order", async (req, res) => {
            const result = await orderCollection.insertOne(req.body);
            res.json(result);
        });

        app.get("/orders/:email", async (req, res) => {
            const user = req.params.email
            const query = { email: user }
            const result = await orderCollection.find(query).toArray();
            res.send(result)
        });

        //delete:
        app.delete("/orders/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await orderCollection.deleteOne(filter);
            res.send(result);
        })

        //user:
        // app.post('/user', async (req, res) => {
        //     const user = await userCollection.insertOne(req.body);
        //     res.send(user);
        // })
        // app.get('/user', async (req, res) => {
        //     const result = await userCollection.find({}).toArray();
        //     res.json(result);
        // })



        //services:
        app.get('/services', async (req, res) => {
            // query = {};
            const result = await collection.find().toArray();
            res.send(result);
        });

        //services:id
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await collection.findOne(filter);
            res.send(result);
        });

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
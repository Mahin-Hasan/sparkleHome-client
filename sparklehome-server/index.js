/* eslint-disable no-undef */
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const jwt = require('jsonwebtoken')

const secret = 'willBeUsedInJwtToken'

app.use(express.json())
const port = 3000


const uri = "mongodb+srv://sparkleHome:1zSfaDNYByGXpsGI@cluster0.4lo48xa.mongodb.net/sparkleHome?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        //connect collection 
        const serviceCollection = client.db('sparkleHome').collection('services')
        const bookingCollection = client.db('sparkleHome').collection('bookings')

        app.get('/', (req, res) => {
            res.send('SparkleHome is running !!!')
        })
        app.get('/api/v1/services', async (req, res) => {
            const cursor = serviceCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        app.post('/api/v1/user/create-bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking)
            res.send(result)
        })

        app.delete('/api/v1/user/cancel-booking/:bookingId', async (req, res) => {
            const id = req.params.bookingId
            const query = { _id: new ObjectId(id) }
            const result = await bookingCollection.deleteOne(query)
            res.send(result)
        })

        app.post('/api/v1/auth/access-token', async (req, res) => {
            //Creating token and send to client

            const user = req.body
            const token = jwt.sign(user, secret)
            console.log(token);
            // jwt.sign({ payload,  },secret)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.listen(port, () => {
    console.log(`SparkleHome in running on port ${port}`)
})
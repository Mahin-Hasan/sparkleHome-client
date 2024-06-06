const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
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

        app.post



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
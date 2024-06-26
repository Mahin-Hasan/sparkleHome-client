/* eslint-disable no-undef */
const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const jwt = require('jsonwebtoken')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const secret = 'willBeUsedInJwtToken'
const port = 3000

//parsers
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
})
)


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

        //maddleware
        //verrify token and grant access
        const gateman = (req, res, next) => {
            const { token } = req.cookies //also be written as cookies.token

            if (!token) {
                return res.status(401).send({ message: 'Unauthorized access' })
            }

            //verify a token symmetric
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    return res.status(401).send({ message: 'Unauthorized access' })
                }
                console.log(decoded);
                //attach decoded user so that others can get it
                req.user = decoded;

                next()
            });
        }

        app.get('/', (req, res) => {
            res.send('SparkleHome is running !!!')
        })
        // Filtering Api Format
        //Filtering based on category
        // http://localhost:3000/api/v1/services        #scenerio 1
        // http://localhost:3000/api/v1/services?category=Home Cleaning   #secnerio 2

        //sorting based on price
        // http://localhost:3000/api/v1/services        #scenerio 3
        // http://localhost:3000/api/v1/services?sortField=price&sortOrder=desc   #secnerio 4

        //pagination 
        // http://localhost:3000/api/v1/services        #scenerio 3
        // http://localhost:3000/api/v1/services?page=1&limit=10  #secnerio 4
        app.get('/api/v1/services', async (req, res) => {
            let queryObj = {}
            let sortObj = {}

            const category = req.query.category
            const sortField = req.query.sortField
            const sortOrder = req.query.sortOrder

            //pagination
            const page = Number(req.query.page) //parsed using number constructor | can aslo be done using parseInt
            const limit = Number(req.query.limit)
            const skip = (page - 1) * limit //simple formula for performing pagination 


            if (category) {
                queryObj.category = category
            }
            if (sortField && sortOrder) {
                sortObj[sortField] = sortOrder //it will create obj like {pirce : desc}
            }

            const cursor = serviceCollection.find(queryObj).skip(skip).limit(limit).sort(sortObj)
            const result = await cursor.toArray()

            //count total data and send to front end
            const total = await serviceCollection.countDocuments()

            res.send({
                total,
                result
            })
        })

        app.get('/api/v1/services/:serviceId', async (req, res) => {
            const id = req.params.serviceId
            const query = { _id: new ObjectId(id) }
            const result = await serviceCollection.findOne(query)
            res.send(result)
        })


        app.post('/api/v1/user/create-bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking)
            res.send(result)
        })


        //user specific bookings
        app.get('/api/v1/user/bookings', gateman, async (req, res) => {
            const queryEmail = req.query.email;
            const tokenEmail = req.user.email;
            //return from the function if email doesnot match
            if (queryEmail !== tokenEmail) {
                return res.status(403).send({ message: 'Forbidden access' })
            }

            let query = {} //send all data
            if (queryEmail) {
                query.email = queryEmail
            }

            const result = await bookingCollection.find(query).toArray()
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
            const token = jwt.sign(user, secret, { expiresIn: 60 * 60 })
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'none'
            }).send({ success: true })
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
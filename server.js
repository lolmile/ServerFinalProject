require('dotenv').config();

// Require express and body-parser
const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const slowDown = require('express-slow-down');
const hookRoute = require('./Routes/webhook.js');
const cors = require('cors');
const sendInfoRoute = require('./Routes/sendInformation.js')
const {connect} = require('./database.js')

// Create a slow down middleware
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // allow 50 requests per 15 minutes, then...
    delayMs: () => 1000 // begin adding 1000ms of delay per request above 50:
});

//We set this proxy option so that the limiter is set to user-basis and not global
//numberOfProxies is the number of proxies between the user and the server. This can be changed depending on where the server is hosted
app.set('trust proxy', parseInt(process.env.numberOfProxies))

app.use(cors())
app.use(speedLimiter);

// Tell express to use body-parser's JSON parsing
app.use(bodyParser.json())

app.get('/health', (req, res) => {
    res.send('Welcome to the homepage!');
});
app.get('/ip', (request, response) => response.send(request.ip))

app.use('/hook', hookRoute)
app.use('/events', sendInfoRoute)

const port = process.env.PORT || 8080;
app.listen(port, () => {
    connect()
    console.log("Server listening on port " + port)
})
const serverConfig = require('./constants/serverConfig');
// const dotend = require('dotenv/config');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
// const mongoose = require('mongoose');
const { connectDb } = require('./schema');
const routes = require('./routes');
const responseCode = require('./constants/responseCode');

const app = express();
const PORT = process.env.PORT || serverConfig.port;
app.use(cors());
app.set('port', PORT);
app.use(bodyParser.json({ limit: '20mb' }));

app.use(serverConfig.baseUrl + 'users', routes.user);

connectDb()
    .then(() => {
        app.listen(PORT, () => {
            console.log("Database connection is Ready "
                + "and Server is Listening on Port ", PORT);
        })
    })
    .catch((err) => {
        console.log("A error has been occurred while"
            + " connecting to database.");
    })

//Connection to the mongodb database
// mongoose.connect('mongodb://localhost:27017/demo')
// .then(()=>{
//     app.listen(PORT, ()=>{
//         console.log("Database connection is Ready "
//         + "and Server is Listening on Port ", PORT);
//     })
// })
// .catch((err)=>{
//     console.log("A error has been occurred while"
//         + " connecting to database.");   
// })

module.exports =  app;
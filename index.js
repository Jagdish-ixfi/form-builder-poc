require('dotenv').config()
const express = require('express')
const database = require('./config/db')
const http = require('http')

const app = express();
app.use(express.json())
//Routes
// Config Router Grouping
express.application.prefix = express.Router.prefix = function (path, configure) {
    const router = express.Router();
    this.use(path, router);
    configure(router);
    return router;
};

app.use('/', require('./routes') )

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const server = http.createServer(app);

console.log("Trying to listen on : ", port);
server.listen(port, "0.0.0.0");
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return port
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

function onError(error) {
    console.log("Error while starting server", error);
}

function onListening(){
    const address = server.address();
    console.log("Server started on : ", address.port);
}
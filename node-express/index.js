const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev')); // whenever you use a middleware: app.use(...)
app.use(bodyParser.json());

app.all('/dishes', (req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next(); // means it'll continue on to look for additional specifications down below to match this '/dishes' endpoint
})

app.get('/dishes',(req,res,next) => {
    res.end('Will send all the dishes to you!');
})

app.post('/dishes', (req,res,next) => {
    res.end('will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
})

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>')
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at htt://${hostname}:${port}/`);
})
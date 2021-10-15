import express from 'express';
import { createRequire } from 'module';
var require = createRequire(import.meta.url);
var config = require('../configs/config.json');
import { mceHandler } from '../mceHandler.js';
var port = config.express.port;
export var startServer = function () {
    var app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.post('/', function (req, res) {
        console.log(req.body);
        res.send(req.body);
    });
    app.get('/', function (req, res) {
        console.log("test");
        res.send("test");
    });
    //Test call
    app.post('/test', function (req, res) {
        res.send(req.body);
    });
    //Empfange die Factoren & Extend
    app.post('/mce', function (req, res) {
        try {
            var result = mceHandler(req.body);
            res.json({ result: result });
        }
        catch (_a) {
            res.send(500);
        }
    });
    var server = app.listen(port, function () {
        console.log("Calc listening at http://localhost:" + port);
    });
};
export default startServer;

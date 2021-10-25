import express from 'express';
import { createRequire } from 'module';
import getStats from '../stats.js';
var require = createRequire(import.meta.url);
var config = require('../configs/config.json');
import mceHandler from '../mceHandler.js';
export var startServer = function () {
    var port = config.express.port;
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
    //Empfange die Factoren & Extend
    app.post('/mce', function (req, res) {
        try {
            var result = mceHandler(req.body);
            res.json({ result: result });
        }
        catch (_a) {
            res.json({ status: 500 });
        }
    });
    app.post('/stats', function (req, res) {
        var stats = getStats(req.body);
        if (stats) {
            res.json({ stats: stats });
        }
        else {
            res.json({ status: 500 });
        }
        ;
    });
    var server = app.listen(port, function () {
        console.log("Calc listening at http://localhost:" + port);
    });
};
export default startServer;

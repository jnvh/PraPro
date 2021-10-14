import express from 'express';
var port = 5000;
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
        /*console.log("logging");
        const mceHandler = new MceHandler(req.body);
        console.log(mceHandler.getStatus())
        mceHandler.startMCE();
        res.json(mceHandler.getStatus().code);    */
    });
    var server = app.listen(5000, function () {
        console.log("Calc listening at http://localhost:5000");
    });
};
export default startServer;

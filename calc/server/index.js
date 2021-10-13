import express from 'express';
var port = 5000;
export var startServer = function () {
    var app = express();
    var name = "";
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
        name = req.body;
        res.send(200);
    });
    //Empfange die Factoren & Extend
    app.post('/mce', function (req, res) {
        // Wandel req.body in ein objekt um
        var dummyweights = [0.1];
        var dummynames = [""];
        var input = {
            factors: dummynames,
            weights: dummyweights
        };
        var mce = mceAnalysis(input);
        mce.then(function (resolve) {
            res.send(resolve);
        }).catch(function (err) {
            res.send(JSON.stringify(err));
        });
    });
    var server = app.listen(5000, function () {
        console.log("Calc listening at http://localhost:5000");
    });
};
export default startServer;

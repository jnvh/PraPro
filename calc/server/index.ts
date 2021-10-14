import express from 'express';
import {mceHandler}from '../mceHandler';
const port = 5000;
export const startServer = () => {

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.post('/', (req, res) => {
        console.log(req.body)
        res.send(req.body)
    });

    app.get('/', (req, res) => {
        console.log("test")
        res.send("test")
    });

    //Test call
    app.post('/test', (req, res) => {
        res.send(req.body);
    });

    //Empfange die Factoren & Extend
    app.post('/mce', (req, res) => {
        /*console.log("logging");
        const mceHandler = new MceHandler(req.body);
        console.log(mceHandler.getStatus())
        mceHandler.startMCE();
        res.json(mceHandler.getStatus().code);    */    
    });
    
    const server = app.listen(5000, () => {
        console.log(`Calc listening at http://localhost:5000`)
    });

};

export default startServer;

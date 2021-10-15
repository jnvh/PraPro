import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require('../configs/config.json');
import { mceHandler } from '../mceHandler.js';
const port = config.express.port;
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
        try {
            const result = mceHandler(req.body);
            res.json({ result: result });
        } catch {
            res.send(500);
        }
    });

    const server = app.listen(port, () => {
        console.log(`Calc listening at http://localhost:${port}`)
    });

};

export default startServer;

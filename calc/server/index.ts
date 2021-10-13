import express from 'express';
const port = 5000;
export const startServer = () => {

    const app = express();
    let name: string = "";

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
        name = req.body;
        res.send(200);
    });

    //Empfange die Factoren & Extend
    app.post('/mce', (req, res) => {
      // Wandel req.body in ein objekt um
      const dummyweights = [0.1];
      const dummynames = [""];
      const input = {
          factors: dummynames,
          weights: dummyweights
      }
      const mce = mceAnalysis(input);
      mce.then(
          (resolve: string) =>{
              res.send(resolve);
          }
      ). catch(
          (err: string) => {
              res.send(JSON.stringify(err));
          }
      );  
    });

    const server = app.listen(5000, () => {
        console.log(`Calc listening at http://localhost:5000`)
    });

};

export default startServer;

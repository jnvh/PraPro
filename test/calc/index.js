// server/index.js

const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

// server/index.js

/*app.get("/api", (req, res) => {
    res.json({ message: "Hello from Express!" });
  });
*/
app.put("/api", (req, res) =>{
    res.json({content: req.body});
});
  
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

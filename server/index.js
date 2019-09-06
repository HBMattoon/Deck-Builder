const express =  require('express');
const path = require('path');
const bodyParser = require('body-parser');
const limiter = require('express-rate-limit')
// const { findCard } = require('./controller/mtgFinder.js')
const { checkHist, createDeck } = require('./controller/database.js');
const { newFindCard } = require('./controller/mtgFinder.js');

const rateLimit = require("express-rate-limit");

const port = 3000;

const app = express();

const apiLimiter = rateLimit({
  windowMs: 100, // 15 minutes
  max: 1
});

app.use('/', express.static(path.join(__dirname, './../client/dist')));
app.use(bodyParser.json());
app.use("/api/test", apiLimiter);

app.get('/api/mtg',(req, res) =>{
  let queryParams = req.query.params;
  queryParams = JSON.parse(queryParams)

  checkHist(queryParams, (err, result) => {
    if(err){
      console.log('error in callback: ' + err);
      res.end();
    } else {
      res.send(result).end();
    }
  })
});

app.get('/api/deck',(req, res) => {

})



// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);


// only apply to requests that begin with /api/



let test = 1;
app.get('/api/test', (req, res) => {
  test = test + 1;
  newFindCard(test,(val) => {
    res.send(val).end();
  });
})

app.post('/api/deck',(req, res) =>{
  console.log('got post request');
  let queryParams = req.body;
  console.log(queryParams)

  //queryParams = JSON.parse(queryParams);
  createDeck(queryParams,(id)=>{
    console.log('returning id: ' + id);
    //id = JSON.stringify({"id":id})
    res.json(id).end();
  })

});

app.put('/api',(req, res) =>{

});

app.delete('/api',(req, res) =>{

});

app.listen(port, ()=> console.log(`listening to port ${port}`));

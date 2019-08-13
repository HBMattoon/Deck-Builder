const express =  require('express');
const path = require('path');
const bodyparser = require('body-parser');
// const { findCard } = require('./controller/mtgFinder.js')
const { checkHist, createDeck } = require('./controller/database.js')


const port = 3000;

const app = express();

app.use('/', express.static(path.join(__dirname, './../client/dist')));


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

app.post('/api/deck',(req, res) =>{
  console.log('got post request');
  let queryParams = req.query.params;
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

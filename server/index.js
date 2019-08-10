const express =  require('express');
const path = require('path');
const bodyparser = require('body-parser');

const port = 3000;

const app = express();

app.use('/', express.static(path.join(__dirname, './../client/dist')));


app.get('/api',(req, res) =>{

});

app.post('/api',(req, res) =>{

});

app.put('/api',(req, res) =>{

});

app.delete('/api',(req, res) =>{

});

app.listen(port, ()=> console.log(`listening to port ${port}`));

const express =  require('express');
const path = require('path');
const bodyparser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, '/../client/dist')));


app.get('/',(req, res) =>{

});

app.post('/',(req, res) =>{

});

app.put('/',(req, res) =>{

});

app.delete('/',(req, res) =>{

});

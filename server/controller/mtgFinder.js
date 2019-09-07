const mtg = require('mtgsdk');
const fetch = require('node-fetch');


const findCard = (searchParams, callback) => {
  mtg.card.where(searchParams)
  .then(cards => {
    let test = JSON.stringify(cards);
    //console.log(test);
    callback(null, test);
  })
  .catch(err => callback(err, null))
}




//TODO need to creat query generator/translater function based off of search terms
const newFindCard = (searchTerms, cb) => {

  console.log('pong')

  fetch(`https://api.scryfall.com/cards/search?q=c%3Awhite+cmc%3D1`)
  .then(res => res.json())
  .then(res => {
  //  console.log(res);
    //TODO all results should be gotten here and passed as a batch to callback





    res = JSON.stringify(res);
    cb(null, res);
  })
  .catch(err => cb(err,null));
}

module.exports = {
  findCard,
  newFindCard
}




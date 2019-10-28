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

//basic version for single variable
const queryTranslator = (query) => {
  if(query.name){
    console.log(`getting name: ${query.name}`);
    return query.name;
  } else if(query.subtypes){
    console.log(`getting type: ${query.subtypes}`)
    return (`t%3A${query.subtypes}`)
  } else if(query.text){
    return (`o%3A${query.text}`);
  } else if(query.color){
    return (`t%3A${query.subtypes}`)
  }

}
//c%3Awhite+cmc%3D1

//TODO need to creat query generator/translater function based off of search terms
const newFindCard = (searchTerms, cb, nextURL) => {

  let searchURL;
  console.log(searchTerms);
  if(nextURL){
    searchURL = nextURL;
  } else {
    searchURL = `https://api.scryfall.com/cards/search?q=${queryTranslator(searchTerms)}`
  }
  console.log(searchURL);
  fetch(searchURL)
  .then(res => res.json())
  .then(res => {
    console.log('number of cards being return: ', res.data.length);
    //TODO all results should be gotten here and passed as a batch to callback
    //if there are mor pages,
    //wait 100 miliseconds then call db for next page



    //res = JSON.stringify(res);
    cb(null, res);

  })
  .catch(err => cb(err,null));
}

const getNextPage = (pageURL) => {

}

module.exports = {
  findCard,
  newFindCard
}




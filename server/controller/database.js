const { Client } = require('pg');
const { findCard, newFindCard } = require('./mtgFinder.js');
const client = new Client(
  {
    database: 'deckbuilder',
  }
)

client.connect()
.catch(err => console.log('error connecting: ', err))

//generate 9char id for deck
const idGen = () => {
  let result = []
  for(let x = 0; x < 9; x++){
    result.push(String.fromCharCode(Math.floor(Math.random() * 25) + 65))
  }
  result = result.join('');
  console.log('new id is: ' + result);
  return result
}

//ADD NEW DECK TO DATABASE
const createDeck = (deck, cb) =>{
  let id = idGen();
  let JSONsearchParams = JSON.stringify(deck)

  console.log(typeof id)
  client.query(`insert into decks (owner_id, deck_list) values ('${id}', $$${JSONsearchParams}$$)`)
  .then(()=> {
    console.log('added to decks')
    cb(id);
  })
  .catch(err => console.log(err));

}

// const addHist = (searchParams, results) => {
//   let JSONsearchParams = JSON.stringify(searchParams)
//   client.query(`insert into searchHist (query, response) values ($$${JSONsearchParams}$$, $$${results}$$)`)
//   .then(()=> console.log('added to history'))
//   .catch(err => console.log(err));
// }

const updateDeck = (deck, id, cb) =>{

}

const deleteDeck = (id, cb) =>{

}

//RETRIEVE DECK FROM DATABASE USING ID
const getDeck = (id, cb) =>{
  //query database for given user_id
  console.log('getting deck with id: ', id);

  client.query(`select exists(select * from decks where owner_id = UPPER('${id}'))`)
  .then(res => {
    if(res.rows[0].exists){
      console.log('deck exists!!!!');
      client.query(`select deck_list from decks where owner_id = UPPER('${id}')`)
      .then(res => {
        console.log('deck contents is: ', res.rows[0])
        cb(null, res);
      })
      .catch(err => cb(err, null))
    }
  })

  //check if db actually holds a deck with the given user_id
  //if doesnt exits, return some type of error msg,
  //otherwise return data

}


//TODO use HIST to get specific searches if more general searches have been done
//ie: if 'cats' is in hist then use hist to find 'black cats'
const checkHist = (searchParams, callback) => {
  let JSONsearchParams = JSON.stringify(searchParams)
  console.log('searching: ' + JSONsearchParams);
  client.query(`select exists(select * from searchHist where query = $$${JSONsearchParams}$$)`)
  .then( results => {
    if(results.rows[0].exists){

      console.log('getting from hist')
      client.query(`select response from searchHist where query = $$${JSONsearchParams}$$`, (err, res)=>{
        if(err) console.log(err);
        var result = JSON.stringify(res.rows[0].response);
        callback(null, result);
      })
      //.catch(err => console.log('error in checkHist: ', err))

    } else {

      console.log('getting from api')
      //using new find card function using scryfall instad of mtg-api
      newFindCard(searchParams, (err, result) => {
        if(err) console.log(err);
        addHist(searchParams, result);
        callback(null, result);
      });

    }
  })
  .catch((err) => console.log("error! " + err));

}

const addHist = (searchParams, results) => {
  let JSONsearchParams = JSON.stringify(searchParams)
  client.query(`insert into searchHist (query, response) values ($$${JSONsearchParams}$$, $$${results}$$)`)
  .then(()=> console.log('added to history'))
  .catch(err => console.log(err));
}



module.exports = {
  checkHist,
  createDeck,
  getDeck,
}

const { Client } = require('pg');
const { findCard } = require('./mtgFinder.js');
const client = new Client(
  {
    database: 'deckbuilder',
  }
)

client.connect();

const checkHist = (searchParams, callback) => {
  let JSONsearchParams = JSON.stringify(searchParams)
  //console.log(typeof JSONsearchParams);
  //let test = 'cool test';
  client.query(`select exists(select * from searchHist where query = '${JSONsearchParams}')`)
  //.then(results=> results.json())
  .then( results => {
    console.log(results.rows)
    if(results.rows[0].exists){

      console.log('getting from hist')
      client.query(`select response from searchHist where query = '${JSONsearchParams}'`, (err, res)=>{
        if(err) console.log(err);
        var result = JSON.stringify(res.rows[0].response);
        //console.log(res.rows[0].response);
        console.log(result)
        callback(null, result);
      })
      // .then(res => {
      //   console.log(res.json());
      // })
      // .then(response => {
      //   callback(null, response);
      // })

    } else {

      console.log('getting from api')
      findCard(searchParams, (err, result) => {
        if(err) console.log(err);
        addHist(searchParams, result);
        callback(null, result);
      });

    }
  })
  .catch((err) => console.log(err));

}

const addHist = (searchParams, results) => {
  let JSONsearchParams = JSON.stringify(searchParams)
  console.log(JSONsearchParams);
  console.log(results)
  client.query(`insert into searchHist (query, response) values ('${JSONsearchParams}', '${results}')`)
  .then(()=> console.log('added to history'))
  .catch(err => console.log(err));
}

module.exports = {
  checkHist
}

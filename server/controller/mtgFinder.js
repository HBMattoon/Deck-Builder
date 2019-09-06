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


//card queue in order to prevent api overuse



// let testArr = [];

// const getNext = (cb) => {
//   if(testArr.length > 0){
//     setTimeout(() => {
//       console.log(testArr.pop())
//       getNext(cb);
//     }, 1000);
//   } else {
//     console.log('theEnd')
//     cb()
//   }
// }

const newFindCard = (searchTerms, cb) => {

  console.log('pong')

  fetch(`https://api.scryfall.com/cards/search?q=c%3Awhite+cmc%3D1`)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    cb('test');
  })
  .catch(err => {console.log('error!: ' + err)});
}

module.exports = {
  findCard,
  newFindCard
}




const mtg = require('mtgsdk');


const findCard = (searchParams, callback) => {
  mtg.card.where(searchParams)
  .then(cards => {
    let test = JSON.stringify(cards);
    callback(null, test);
  })
  .catch(err => callback(err, null))
}


module.exports = {
  findCard,
}



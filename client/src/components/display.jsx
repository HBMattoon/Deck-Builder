import React from 'react';
import CardDetails from './cardDetails.jsx';
import CardDisplay from './cardDisplay.jsx';
import Deck from './deck.jsx';

let currentCard = {};
class Display extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cardCollection: [],
      currentCard: {},
      currentId: 'save deck',
    }
    this.clickedCard = this.clickedCard.bind(this);
    this.addToCollection = this.addToCollection.bind(this);
    this.saveDeck = this.saveDeck.bind(this);
  }

  // componentDidMount(){
  //   this.setState({currentCard: this.props.cards[0]})
  // }

  //save new deck, or update old one
  saveDeck(id){
    if(id){
      //update
    } else {
      //post
      console.log('here we go')
      let collection = this.state.cardCollection
      console.log(collection)
      // let query = {"deck": collection}
      let jsonQuery = JSON.stringify(collection);
      console.log(jsonQuery);
      fetch(`/api/deck/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collection)}) //JSON.stringify(collection)
      .then(res => res.json())
      .then(res => {
        this.setState({currentId: JSON.stringify(res)})
        console.log('look what i got! ' + JSON.stringify(res));
      })
      .catch(err => console.log( err));
    }
  }

  loadDeck(id){
    //get


  }

  deleteDeck(id){
    //delete

  }


  clickedCard(card){
    //console.log(card.name);
    currentCard = card;
    console.log(currentCard.name)
    //CardDetails.prototype.test(card);
    this.setState({'currentCard': card});
  }

  addToCollection(card){
    let arr = this.state.cardCollection;
    console.log(arr);
    if(card.name){
      arr.push(card);
      this.setState({cardCollection: arr})
    }
  }

  render(){
    return(
      <div id="mainDisplay">
        {/* {console.log(this.props.cards[0])} */}

        <CardDisplay cards={this.props.cards} clickedCard={this.clickedCard}/>

        <div className="sidebar">

          <CardDetails add={this.addToCollection} card={this.state.currentCard}/>

          <Deck currentId={this.state.currentId} saveDeck={this.saveDeck} currentCard={this.clickedCard} collection={this.state.cardCollection}/>

        </div>
      </div>
    )
  }
}




export default Display;







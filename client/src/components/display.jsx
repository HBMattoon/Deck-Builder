import React from 'react';
import CardDetails from './cardDetails.jsx';
import CardDisplay from './cardDisplay.jsx';

let currentCard = {};
class Display extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      cardSelection: [],
      currentCard: {'name':'choose a card!'},
    }
    this.hoveredCard = this.hoveredCard.bind(this);
  }


  hoveredCard(card){
    //console.log(card.name);
    currentCard = card;
    console.log(currentCard.name)
    //CardDetails.prototype.test(card);
    this.setState({'currentCard': card});
  }

  render(){
    return(
      <div id="mainDisplay">
        {console.log(this.props.cards[0])}

        <CardDisplay cards={this.props.cards} hoveredCard={this.hoveredCard}/>
        <CardDetails card={this.state.currentCard}/>
      </div>
    )
  }
}




export default Display;







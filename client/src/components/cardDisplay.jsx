import React from 'react';
import Card  from './Card.jsx';

let key = 0;

class CardDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      cards: ['test'],
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.cards === nextProps.cards) {
      return false;
    } else {
      return true;
    }
  }

  render(){
    return(
      <div className="cardZone">

        {this.props.cards.map((card)=>{
          //console.log(card);
          return <Card key={key++} clickedCard={this.props.clickedCard} card={card} />
        })}
      </div>
    )
  }
}

export default CardDisplay;

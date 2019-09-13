import React from 'react';
import Card  from './Card.jsx';

class CardDisplay extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
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
          return <Card hoveredCard={this.props.hoveredCard} card={card} />
        })}
      </div>
    )
  }
}

export default CardDisplay;

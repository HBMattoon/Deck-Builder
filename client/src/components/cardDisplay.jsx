import React from 'react';



let key = 0;
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
          if(card.imageUrl){
            return <img onClick={()=>this.props.hoveredCard(card)} className="cards" key={key++} src={card.imageUrl} alt={card.name}></img>
          }
        })}
      </div>
    )
  }
}

export default CardDisplay;

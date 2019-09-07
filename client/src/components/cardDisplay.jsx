import React from 'react';

let cardBG = 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/0/07/Cardback_yellow.jpg?version=bb6894599b5370bc95db2af9c1f6dbf9';
let distractionMode = true;
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
          console.log(card)
          if(card.image_uris.small){
            return <img onClick={()=>this.props.hoveredCard(card)} className="cards" key={key++} src={distractionMode ? cardBG : card.image_uris.large} alt={card.name}></img>
          }
        })}
      </div>
    )
  }
}

export default CardDisplay;

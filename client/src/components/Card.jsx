 import React from 'react';

 let cardBG = 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/0/07/Cardback_yellow.jpg?version=bb6894599b5370bc95db2af9c1f6dbf9';
 let key = 0;
 let distractionMode = false;
 //if true, does not show cards in card zone, else card faces are shown

 class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      card: undefined,
      image: cardBG,
    }
  }

  componentDidMount(){
    this.getCardImage(this.props.card);
  }

  getCardImage(card){
    let image_uri = '';
    let name = '';
    if(card.card_faces){
      image_uri = card.card_faces[0].image_uris.large
      name = card.card_faces[0].name
    } else {
      image_uri = card.image_uris.large
      name = card.name
    }
    this.setState({image: image_uri});
  }



  render(){
    return <img onClick={()=>this.props.hoveredCard(this.props.card)} className="cards" key={key++} src={distractionMode ? cardBG : this.state.image} alt={this.props.card.name}></img>
  }
 }

export default Card;



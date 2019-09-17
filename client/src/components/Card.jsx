 import React from 'react';

 let cardBG = 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/0/07/Cardback_yellow.jpg?version=bb6894599b5370bc95db2af9c1f6dbf9';
 let key = 0;
 let distractionMode = false;
 //if true, does not show cards in card zone, else card faces are shown

 class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      card: {},
      offset: -30
    }
  }

  // componentDidMount(){
  //   this.setState({offset: 0});
  // }

  getCardImage(card){
    //let card = this.props.card;
    let image_uri = '';
    let name = '';
    if(card.card_faces && !card.image_uris){
      if(card.card_faces[0].image_uris ){
        image_uri = card.card_faces[0].image_uris.large
      } else {
        console.log('the hell is this: ', card.card_faces[0])
      }
      name = card.card_faces[0].name
    } else {
      image_uri = card.image_uris.large
      name = card.name
    }
    //this.setState({card: card})
    //console.log('state is: ', this.state.card);
    return image_uri;
  }

  slideButton(val){
    let buttonTransform = {
      transform: `translateY(${val}px)`,
      // border: 'yellow solid 1px'
     }
     return buttonTransform;
  }

  showFlip(){
    this.setState({offset: 0})
  }
  hideFlip(){
    this.setState({offset: -30})
  }


  render(){
    return (
      <div key={this.props.keyval} className="test" onMouseEnter={() => this.showFlip()} onMouseLeave={() => this.hideFlip()}>
        <div style={this.slideButton(this.state.offset)} className="button">test</div>
        <img onClick={() => this.props.hoveredCard(this.props.card)} className="cards" src={distractionMode ? cardBG : this.getCardImage(this.props.card)} alt={this.props.card.name}></img>
      </div>
    )
  }
 }

export default Card;



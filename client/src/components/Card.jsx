 import React from 'react';

 let cardBG = 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/0/07/Cardback_yellow.jpg?version=bb6894599b5370bc95db2af9c1f6dbf9';
 let key = 0;
 let distractionMode = false;
 let face = 0;
 //if true, does not show cards in card zone, else card faces are shown

 class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      card: undefined,
      //cardFace: undefined,
      image: undefined,
      offset: -30
    }
  }

  componentDidMount(){
    //this.getCardState();
    //console.log('new mount')
    this.setState({card: this.props.card});
    this.updateCardImage(this.props.card, 0);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      //console.log('updated mount')
      this.setState({
        card: nextProps.card
      });

      this.updateCardImage(nextProps.card, 0);
    }
  }


  updateCardImage(card, face){
    //let card = this.props.card;
    let image_uri = '';
    //let name = '';
    if(card.card_faces && !card.image_uris){
      if(card.card_faces[face].image_uris ){
        image_uri = card.card_faces[face].image_uris.large
      } else {
        console.log('what this: ', card.card_faces[face])
      }
      //name = card.card_faces[0].name
    } else {
      image_uri = card.image_uris.large
      //name = card.name
    }
    //return image_uri;
    //console.log('getting image!')
    this.setState({image: image_uri});
  }

  // getCardState(){
  //   let currentCard = this.props.card;
  //   if(currentCard.card_faces !== undefined){
  //     this.setState({cardFace: currentCard.card_faces[0]})
  //   }
  // }

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

  flipFace(){
    if(face === 0){
      face = 1;
      this.updateCardImage(this.state.card, face);
    } else {
      face = 0;
      this.updateCardImage(this.state.card, face);
    }
  }


  // currentCard(){


  //   console.log('test getting called!')
  //   if(this.state.cardFace){
  //     console.log('state exists, returning', this.state.cardFace)
  //     return this.state.cardFace;
  //   } else {
  //     console.log('returning props', this.props.card)
  //     return this.props.card;
  //   }  //return this.state.card ? this.state.card : this.props.card
  // }


  render(){
    return (
      <div key={this.props.keyval} className="test" onMouseEnter={() => this.showFlip()} onMouseLeave={() => this.hideFlip()}>
        <div style={this.slideButton(this.state.offset)} className="button">
          <div className="drop_down_button" onClick={() => this.flipFace()}>
            flip
          </div>
        </div>
        <img onClick={() => this.props.hoveredCard(this.state.card)} className="cards" src={distractionMode ? cardBG : this.state.image}></img>
      </div>
    )
  }
 }

export default Card;



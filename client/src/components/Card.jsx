 import React from 'react';

 let cardBG = 'https://gamepedia.cursecdn.com/mtgsalvation_gamepedia/0/07/Cardback_yellow.jpg?version=bb6894599b5370bc95db2af9c1f6dbf9';
 let key = 0;
 let distractionMode = false;
 let face = 1;
 //if true, does not show cards in card zone, else card faces are shown

 class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      card: undefined,
      image: undefined,
      offset: -30,
      mergeImage: undefined,
      face: 0,
      needButton: false,
    }
  }

  componentDidMount(){
    this.setState({card: this.props.card});
    this.updateCardImage(this.props.card, 0);
    this.fetchMerge(this.props.card);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        card: nextProps.card
      });
      this.updateCardImage(nextProps.card, 0);
      this.fetchMerge(nextProps.card);
    }
  }

  fetchMerge(card){
    if(card.all_parts){
      if(card.all_parts[0].component === 'meld_part'){
        fetch(card.all_parts[2].uri)
        .then(res => res.json())
        .then(res => {
          res = res.image_uris.large
          this.setState({mergeImage: res});
        })
      }
    }
  }


  updateCardImage(card, face){
    let image_uri = '';
    let needButton = false;
    if(this.state.mergeImage){
      //check if merged
      needButton = true;
      if(face === 1){
        image_uri = this.state.mergeImage;
      } else {
        image_uri = card.image_uris.large
      }
    } else if(card.card_faces && !card.image_uris){
      //check if duel faced card
      if(card.card_faces[face].image_uris ){
        image_uri = card.card_faces[face].image_uris.large
        needButton = true;
      }
    } else {
      image_uri = card.image_uris.large
    }
    this.setState({image: image_uri, face: face, needButton: needButton});
  }

  slideButton(val){
    let buttonTransform = {
      transform: `translateY(${val}px)`,
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
    if(this.state.face === 0){
      let face = 1;
      this.updateCardImage(this.state.card, face);
    } else {
      let face = 0;
      this.updateCardImage(this.state.card, face);
    }
  }

  getButton(){
    if(this.state.needButton){
      return(
        <div style={this.slideButton(this.state.offset)} className="button">
          <div className="drop_down_button" onClick={() => this.flipFace()}>
            flip
          </div>
        </div>
      )
    }
  }


  render(){
    return (
      <div key={this.props.keyval} className="test" onMouseEnter={() => this.showFlip()} onMouseLeave={() => this.hideFlip()}>
        {this.getButton()}
        <img onClick={() => this.props.clickedCard(this.state.card)} className="cards" src={distractionMode ? cardBG : this.state.image}></img>
      </div>
    )
  }
 }
//
export default Card;




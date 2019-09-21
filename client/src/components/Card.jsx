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
    this.fetchMerge(this.props.card);
    this.updateCardImage(this.props.card, 0);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        card: nextProps.card
      });
      this.fetchMerge(nextProps.card);
      this.updateCardImage(nextProps.card, 0);
    }
  }

  fetchMerge(card){
    let needButton = 'merge';
    if(card.all_parts){
      if(card.all_parts[0].component === 'meld_part'){
        fetch(card.all_parts[2].uri)
        .then(res => res.json())
        .then(res => {
          res = res.image_uris.large
          this.setState({mergeImage: res, needButton: needButton});
        })
      }
    }
  }


  updateCardImage(card, face){
    let image = '';
    let needButton = false;
    if(this.state.mergeImage){
      //check if merged
      needButton = 'merge';
      if(face === 1){
        image = this.state.mergeImage;
      } else {
        image = card.image_uris.large
      }
    } else if(card.card_faces && !card.image_uris){
      //check if duel faced card
      if(card.card_faces[face].image_uris ){
        image = card.card_faces[face].image_uris.large
        needButton = 'flip';
      }
    } else {
      image = card.image_uris.large
    }
    this.setState({image, face, needButton});
  }

  slideButton(val){
    let buttonTransform = {
      transform: `translateY(${val}px) translateX(4px)`,
     }
     return buttonTransform;
  }

  showFlip(){
    this.setState({offset: 2})
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

  getButton(needButton){
    if(needButton){
      return(
        <div style={this.slideButton(this.state.offset)} className="button">
          <div className="drop_down_button" onClick={() => this.flipFace()}>
            {needButton}
          </div>
        </div>
      )
    }
  }


  render(){
    return (
      <div key={this.props.keyval} className="test" onMouseEnter={() => this.showFlip()} onMouseLeave={() => this.hideFlip()}>
        {this.getButton(this.state.needButton)}
        <img onClick={() => this.props.clickedCard(this.state.card)} className="cards" src={distractionMode ? cardBG : this.state.image}></img>
      </div>
    )
  }
 }

export default Card;




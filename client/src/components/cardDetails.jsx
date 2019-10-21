import React from 'react'
import {manaParse, parseCardText} from '../tools/cardParse.jsx'


let key = 0;

let options = [
  ['image', 'Card Image'],
  ['name','Name'],
  ['mana','Mana Cost'],
  ['type', 'Spell Type'],
  ['text','Oracle Text'],
  ['pt','Power & Toughness'],
  ['flavor','Flavor Text'],
  ['rarity','Card Rarity'],
  ['set','Card Set'],
];



class CardDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentFace: {name: 'cool'},
      face: 0,
      viewOptions: false,
      image: true,
      name: true,
      mana: true,
      text: true,
      pt: true,
      flavor: true,
      type: true,
      rarity: true,
      set: true,
    };
    this.myRef = React.createRef();
  }

  //reset scroll position for details box on card change
  componentDidMount(){
    this.myRef.current.scrollTo(0,0);
  }
  componentDidUpdate(){
    this.myRef.current.scrollTo(0,0);
  }

  getCardFace(card){
    // check if normal card
    // card.card
    let layout = card.layout;
    if(card.layout === 'transform'){
      console.log(card)
      // console.log('returning card face at index: ', this.state.face);
      return card.card_faces[this.state.face]

    // } else if (card.layout === 'split') {
    //   //todo
    // } else if (card.layout === 'flip') {
      //todo
    }else {
      // console.log('in cardDetails.getCardFace()')
      return card;
    }
  }

  addCard(){
    if(this.props.card){
      this.props.add(this.props.card);
      console.log('this is card state', this.state.currentCard)
      // this.props.add(this.state.currentCard);
    }
  }

  setIcon(){
    let test = `ssIcon ss ss-${this.props.card.set.toLowerCase()} ss-grad ss-fw ss-2x ss-${this.props.card.rarity.toLowerCase()}`;
    return test
  }

  getMana(){
    let card = this.getCardFace(this.props.card);
    //console.log(this.props.card.card_face)
    // if(card.card_faces && !card.image_uris){
    //   card = card.card_faces[this.state.face];
    //   console.log('twofaced card!')
    // }
    if(card.mana_cost && this.state.mana){
      return <div><span className="boldWord">Mana Cost: </span> {parseCardText(card.mana_cost)}</div>;
    }
  }

  getPT(){
    let pf1, pf2, tf1, tf2;
    let card = this.getCardFace(this.props.card);

    if(card.power && this.state.pt){
      if(card.layout === 'flip' && card.card_faces[0].toughness){
        pf1 = card.card_faces[0].power;
        pf2 = card.card_faces[1].power;
        tf1 = card.card_faces[0].toughness;
        tf2 = card.card_faces[1].toughness;
      } else {
        pf1 = card.power;
        tf1 = card.toughness;
      }

      return <div className="marginTop10"><span className="boldWord">P/T:</span>{pf2 ? ` ${pf1}/${tf1} // ${pf2}/${tf2}`:` ${pf1}/${tf1}`}</div>;
    }
  }

  getText(){
    let card = this.getCardFace(this.props.card);
    if(this.state.text){
      if(card.layout && (card.layout === 'flip' || card.layout === 'split')){
        let text = [card.card_faces[0].oracle_text, card.card_faces[1].oracle_text];
        text = text.map((text) => {
          let parsedText = parseCardText(text);
          parsedText.unshift(<br/>)
          parsedText.push(<br/>);
          parsedText.push(<span>{'//'}</span>);
          // console.log('parsed text resykts:', parsedText);
          return parsedText;
        })

        text[1].pop();
        return text;
      } else {
        if(card.oracle_text){
          let result = parseCardText(card.oracle_text);
          result.unshift(<br/>);
          return result;
        }
      }
    }
  }

  getFlavor(){
    let card = this.getCardFace(this.props.card);
    if(card.flavor_text && this.state.flavor){
      return(
        <div>
          <br />
          <span className="boldWord">Flavor Text: </span>
          <span className="oracleRules">
            {card.flavor_text}
          </span>
        </div>
      )
    }
  }

  getName(){
    let card = this.getCardFace(this.props.card);
    if(card.name && this.state.name){
      console.log(card)
      return <div className="cardName"><span className="boldWord">Name:</span> {card.name} </div>;
    }
  }

  getType(){
    let card = this.getCardFace(this.props.card);
    if(card.type_line && this.state.type){
      return <div><span className="boldWord">Type:</span> {card.type_line}</div>;
    }
  }

  getRarity(){
    let card = this.props.card;
    if(card.rarity && this.state.rarity){
      return <div><br/><span className="boldWord">Rarity:</span> {card.rarity}</div>;
    }
  }

  getSet(){
    let card = this.props.card;
    if(card.set && this.state.set){
      return <div><span className="boldWord">Set:</span> <i className={this.setIcon()}></i> [{card.set}] {card.setName} </div>;
    }
  }


  getImage(){
    let card = this.getCardFace(this.props.card);
    if(card.image_uris && this.state.image){
      return(
        <img className="resize" src={card.image_uris.large} alt={card.name}></img>
      )
    }
  }

  showInfo(){
    return(
      <div>
        <div className="cardAndButtons">
          {this.getImage()}
        </div>
        <div className="paddingTop5">
          {this.getName()}
          {this.getMana()}
          {this.getType()}
          {this.getText()}
          {this.getPT()}
          {this.getFlavor()}
          {this.getRarity()}
          {this.getSet()}
        </div>
      </div>
    )
  }

  showOptions(){
    let key = 1;
    return(
      <div>
        <button onClick={() => this.resetOption()}>Reset</button>
        {
          options.map((option) => {
            let statePayload = {};
            statePayload[option[0]] = !this.state[option[0]];
            console.log
            return(
              <div key={key++} className="options">
                <input type='checkbox' onChange={()=> {console.log(statePayload);
                  this.setState(statePayload)}} checked={this.state[option[0]]}></input>
                 <span>{option[1]}</span>
                 <br/>
              </div>
            )
          })
        }
      </div>
    )
  }

  resetOption(){
    this.setState({
      image: true,
      name: true,
      mana: true,
      text: true,
      pt: true,
      flavor: true,
      type: true,
      rarity: true,
      set: true,
    })
  }

  render(){
    return(

      <div className="cardDetailsZone">
        <div className="cardDetailOptions">
            <button onClick={()=>{this.addCard()}}>Add</button>
            <button>Remove</button>
            <button onClick={()=> this.setState({viewOptions: !this.state.viewOptions})}>Display Options</button>
        </div>
        <div ref={this.myRef} className="cardDetails">
          {this.state.viewOptions ? this.showOptions() : this.showInfo()}
          <br/>
        </div>
      </div>
    )
  }
}

export default CardDetails;


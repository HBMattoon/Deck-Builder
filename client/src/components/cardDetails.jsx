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
      currentCard: {name: 'cool'},
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

  addCard(){
    if(this.props.card){
      this.props.add(this.props.card);
    }
  }

  //TODO fix icon rarity from being in same shap as last icon with same rarity
  setIcon(){
    let test = `ssIcon ss ss-${this.props.card.set.toLowerCase()} ss-grad ss-fw ss-2x ss-${this.props.card.rarity.toLowerCase()}`;
    return test
  }

  getMana(){
    let card = this.props.card;
    //console.log(this.props.card.card_face)
    if(card.card_faces && !card.image_uris){
      card = card.card_faces[this.state.face];
      console.log('twofaced card!')
    }
    if(card.mana_cost && this.state.mana){
      return <div><span className="boldWord">Mana Cost: </span> {parseCardText(card.mana_cost)}</div>;
    }
  }

  getPT(){
    if(this.props.card.power && this.state.pt){
      return <div className="marginTop10"><span className="boldWord">P/T:</span> {this.props.card.power}/{this.props.card.toughness}</div>;
    }
  }

  getText(){
    if(this.props.card.oracle_text && this.state.text){
      let result = parseCardText(this.props.card.oracle_text);
      result.unshift(<br/>);
      return result;
    }
  }

  getFlavor(){
    if(this.props.card.flavor_text && this.state.flavor){
      return(
        <div>
          <br />
          <span className="boldWord">Flavor Text: </span>
          <span className="oracleRules">
            {this.props.card.flavor_text}
          </span>
        </div>
      )
    }
  }

  getName(){
    if(this.props.card.name && this.state.name){
      console.log(this.props.card)
      return <div className="cardName"><span className="boldWord">Name:</span> {this.props.card.name} </div>;
    }
  }

  getType(){
    if(this.props.card.type_line && this.state.type){
      return <div><span className="boldWord">Type:</span> {this.props.card.type_line}</div>;
    }
  }

  getRarity(){
    if(this.props.card.rarity && this.state.rarity){
      return <div><br/><span className="boldWord">Rarity:</span> {this.props.card.rarity}</div>;
    }
  }

  getSet(){
    if(this.props.card.set && this.state.set){
      return <div><span className="boldWord">Set:</span> <i className={this.setIcon()}></i> [{this.props.card.set}] {this.props.card.setName} </div>;
    }
  }


  getImage(){
    if(this.props.card.image_uris && this.state.image){
      return(
        <img className="resize" src={this.props.card.image_uris.large} alt={this.props.card.name}></img>
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


import React from 'react'
import {manaParse, parseCardText} from '../tools/cardParse.jsx'


let key = 0;

let options = [
  ['image', 'Card Image'],
  ['name','Name'],
  ['mana','Mana Cost'],
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
      viewOptions: false,
      name: true,
      mana: true,
      text: true,
      pt: true,
      flavor: true,
      rarity: true,
      set: true,
    }

    this.getMana = this.getMana.bind(this);
    this.getPT = this.getPT.bind(this);
    this.getText = this.getText.bind(this);
    // this.parseText = this.parseText.bind(this);
  }

  //TODO fix icon rarity from being in same shap as last icon with same rarity
  setIcon(){
    let test = `ssIcon ss ss-${this.props.card.set.toLowerCase()} ss-grad ss-fw ss-2x ss-${this.props.card.rarity.toLowerCase()}`;
    return test
  }

  // manaParse(manaStr = this.props.card.mana_cost){
  //   // let manaStr = this.props.card.mana_cost
  //   manaStr = manaStr.slice(1, manaStr.length-1); //remove curly braces at the ends
  //   let manaArr = manaStr.split('}{')
  //   manaArr = manaArr.map((val)=>{
  //     val = val.toLowerCase().replace('/','')
  //     if(val === 't'){
  //       val = 'tap'
  //     }
  //     return val;
  //   });
  //   return(
  //     manaArr.map((val)=> <i key={key++} className={`ms ms-${val} ms-cost ms-shadow`}></i>)
  //   )
  // }

  getMana(){
    if(this.props.card.mana_cost){
      return <div>Mana Cost: {parseCardText(this.props.card.mana_cost)}</div>;
    }
  }

  getPT(){
    if(this.props.card.power){
      return <div className="marginTop10">P/T: {this.props.card.power}/{this.props.card.toughness}</div>;
    }
  }

  // //hello{1}{2}, my name is {r2} test
  // parseCardText(text){
  //   let arr = text.split('');
  //   let result = [];
  //   let current = [];
  //   let i = 0;
  //   while(arr.length > 0){
  //     //console.log('does ↵ = ',JSON.stringify(arr[0]), '? ', arr[0] === '\n');
  //     if(arr[0] === '{' ){
  //       result.push(current.join(''));
  //       current = [];
  //       current.push(arr.shift())
  //     } else if(arr[0] === '}') {
  //       current.push(arr.shift())
  //       result.push(current.join(''));
  //       current = [];
  //     } else if(arr[0] === '(') {
  //       result.push(current.join(''));
  //       current = [];
  //       current.push(arr.shift())
  //     } else if(arr[0] === ')') {
  //       current.push(arr.shift())
  //       result.push(current.join(''));
  //       current = [];
  //     } else if(arr[0] === '\n'){
  //       //console.log('test!')
  //       result.push(current.join(''));
  //       current = [];
  //       //current.push(arr.shift())
  //       result.push(arr.shift());
  //       current = [];
  //     } else {
  //       current.push(arr.shift())
  //     }
  //   }
  //   result.push(current.join(''));

  //   //console.log('result is: ',result);
  //   return result.map(item => {

  //     if(item[0] === '{'){
  //       return this.manaParse(item);
  //     } else if(item[0] === '\n'){
  //       return <br/>
  //     } else if(item[0] === '(' || item[item.length - 1] === ')'){
  //       return <span className="oracleRules">{item}</span>
  //     }else {
  //       return <span>{item}</span>
  //     }
  //   })
  //   //
  // }

  getText(){
    if(this.props.card.oracle_text){
      let result = parseCardText(this.props.card.oracle_text);
      // console.log(result);
      result.unshift(<br/>);

      return result;
    }
  }

  getFlavor(){
    if(this.props.card.flavor_text){
      return(
        <div>
          <br />
          <span>Flavor Text: </span>
          <span className="oracleRules">
            {this.props.card.flavor_text}
          </span>
        </div>
      )



    }
  }
  getName(){
    //console.log(options)
    if(this.state.name){
      if(this.props.card.name){
        console.log('returning cardName')
        return <div className="cardName">Name: {this.props.card.name} </div>;
      } else {
        return <h1>choose a card!</h1>
      }
    }

  }

  getType(){
    if(this.props.card.type_line){
      return <div>Type: {this.props.card.type_line}</div>;
    }
  }
  getRarity(){
    if(this.props.card.rarity){
      return <div><br/>Rarity: {this.props.card.rarity}</div>;
    }
  }
  getSet(){
    if(this.props.card.set){
      return <div>Set: <i className={this.setIcon()}></i> [{this.props.card.set}] {this.props.card.setName} </div>;
    }
  }

  //todo what does this do?
  update(){
    if(this.props.card){
      this.props.add(this.props.card);
    }
  }

  getImage(){
    if(this.props.card.image_uris){
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
        <div className="info">
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
    return options.map((option) => {
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

  render(){
    return(

      <div className="cardDetailsZone">
        <div className="cardDetailOptions">
            <button onClick={()=>{this.update()}}>Add</button>
            <button>Remove</button>
            <button onClick={()=> this.setState({viewOptions: !this.state.viewOptions})}>Display Options</button>
        </div>
        <div className="cardDetails">
          {this.state.viewOptions ? this.showOptions() : this.showInfo()}
        </div>
      </div>
    )
  }
}

export default CardDetails;


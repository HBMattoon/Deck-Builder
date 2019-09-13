import React from 'react'

let key = 0;

class CardDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentCard: {name: 'cool'},
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

  manaParse(manaStr = this.props.card.mana_cost){
    // let manaStr = this.props.card.mana_cost
    manaStr = manaStr.slice(1, manaStr.length-1); //remove curly braces at the ends
    let manaArr = manaStr.split('}{')
    manaArr = manaArr.map((val)=>{
      val = val.toLowerCase().replace('/','')
      if(val === 't'){
        val = 'tap'
      }
      return val;
    });
    //manaArr.push('/n');
    //console.log('manaArr is: ',manaArr);
    return(
      manaArr.map((val)=> <i key={key++} className={`ms ms-${val} ms-cost ms-shadow`}></i>)
    )
  }

  getMana(){
    if(this.props.card.mana_cost){
      return <div>Mana Cost: {this.manaParse()}</div>;
    }
  }

  getPT(){
    if(this.props.card.power){
      return <div className="marginTop10">P/T: {this.props.card.power}/{this.props.card.toughness}</div>;
    }
  }

  //hello{1}{2}, my name is {r2} test
  parseCardText(text){
    let arr = text.split('');
    let result = [];
    let current = [];
    let i = 0;
    while(arr.length > 0){
      //console.log('does ↵ = ',JSON.stringify(arr[0]), '? ', arr[0] === '\n');
      if(arr[0] === '{' ){
        result.push(current.join(''));
        current = [];
        current.push(arr.shift())
      } else if(arr[0] === '}') {
        current.push(arr.shift())
        result.push(current.join(''));
        current = [];
      } else if(arr[0] === '(') {
        result.push(current.join(''));
        current = [];
        current.push(arr.shift())
      } else if(arr[0] === ')') {
        current.push(arr.shift())
        result.push(current.join(''));
        current = [];
      } else if(arr[0] === '\n'){
        //console.log('test!')
        result.push(current.join(''));
        current = [];
        //current.push(arr.shift())
        result.push(arr.shift());
        current = [];
      } else {
        current.push(arr.shift())
      }
    }
    result.push(current.join(''));

    console.log('result is: ',result);
    return result.map(item => {

      if(item[0] === '{'){
        return this.manaParse(item);
      } else if(item[0] === '\n'){
        return <br/>
      } else if(item[0] === '(' || item[item.length - 1] === ')'){
        return <span className="oracleRules">{item}</span>
      }else {
        return <span>{item}</span>
      }
    })
    //
  }

  getText(){
    if(this.props.card.oracle_text){
      let result = this.parseCardText(this.props.card.oracle_text);
      // console.log(result);
      result.unshift(<br/>);

      return result;
    }
  }

  getFlavor(){
    if(this.props.card.flavor_text){
      return <div className="flav"><br/>Flavor Text: {this.props.card.flavor_text}</div>
    }
  }
  getName(){
    if(this.props.card.name){
      return <div className="cardName">Name: {this.props.card.name} </div>;
    } else {
      return <h1>choose a card!</h1>
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

  render(){
    return(
      <div className="cardDetails">
        <div className="cardAndButtons">
          <button onClick={()=>{this.update()}}>gimme!</button>
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
}

export default CardDetails;


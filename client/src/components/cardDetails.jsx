import React from 'react'

let key = 0;

class CardDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentCard: {name: 'cool'},
    }
    //this.test = this.test.bind(this);
    this.getMana = this.getMana.bind(this);
    this.getPT = this.getPT.bind(this);
    this.getText = this.getText.bind(this);
    // this.parseText = this.parseText.bind(this);
  }

  // test(card){
  //   console.log('very cool test');
  //   this.setState({currentCard: card});
  // }

  setIcon(){
    let test = `ssIcon ss ss-${this.props.card.set.toLowerCase()} ss-grad ss-fw ss-2x ss-${this.props.card.rarity.toLowerCase()}`;
    return test
  }

  manaParse(){
    let manaStr = this.props.card.manaCost
    manaStr = manaStr.slice(1, manaStr.length-1);
    let manaArr = manaStr.split('}{')
    manaArr = manaArr.map((val)=>val.toLowerCase().replace('/',''));
    console.log(manaArr)
    return(
      manaArr.map((val)=> <i key={key++} className={`ms ms-${val} ms-cost ms-shadow`}></i>)
    )
  }

  getMana(){
    if(this.props.card.manaCost){
      return <div>Mana Cost: {this.manaParse()}</div>;
    }
  }

  getPT(){
    if(this.props.card.power){
      return <div>P/T: {this.props.card.power}/{this.props.card.toughness}</div>;
    }
  }

  // parseText(){
  //   let text = this.props.card.text;
  //   let textArr = text.split('');
  //   let currentVal = [];
  //   let target = '';
  //   let adding = 0;
  //   for(let x = 0; x < textArr.length; x++){

  //     //end reached
  //     if(textArr[x] === '}'){
  //       currentVal.push(textArr[x])
  //       adding = 0;
  //       target = currentVal.join('');
  //       text = text.replace(target, <i key={key++} className={`ms ms-g ms-cost ms-shadow`}></i> )
  //       currentVal = [];
  //     }
  //     //adding contents
  //     else if(adding === 1){
  //       currentVal.push(textArr[x])
  //     }
  //     //begin adding
  //     else if(textArr[x] === '{'){
  //       currentVal.push(textArr[x])
  //       adding = 1;
  //     }
  //   }

  //   return text
  // }

  getText(){
    if(this.props.card.text){

      // //return <div>Text: {JSON.stringify(this.parseText())}</div>;
      // return <div>Text: {`test text ${<i key={key++} className={`ms ms-g ms-cost ms-shadow`}></i>}`}</div>;
      return <div><br/>Text: {this.props.card.text}</div>;
    }
  }

  getFlavor(){
    if(this.props.card.flavor){
      return <div className="flav"><br/>Flavor Text: {this.props.card.flavor}</div>
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
    if(this.props.card.type){
      return <div>Type: {this.props.card.type}</div>;
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

  update(){
    if(this.props.card){
      this.props.add(this.props.card);
    }
  }

  render(){
    return(
      <div className="cardDetails">
        <div className="cardAndButtons">
          <button onClick={()=>{this.update()}}>gimme!</button>
          <img className="resize" src={this.props.card.imageUrl} alt={this.props.card.name}></img>
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


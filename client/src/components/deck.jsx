import React from 'react';

let key = 0;
class Deck extends React.Component {
  constructor(props){
    super(props)
    this.state={
      cards: [],
    }
  }

  // componentDidMount(){
  //   this.addCards();
  // }

  // addCards(){
  //   console.log('collection is: ' + this.props.collection);
  //   let newCards = this.props.collection;
  //   this.setState({cards: newCards})
  // }

  manaParse(card){
    if(card.manaCost){
      let manaStr = card.manaCost
      manaStr = manaStr.slice(1, manaStr.length-1);
      let manaArr = manaStr.split('}{')
      manaArr = manaArr.map((val)=>val.toLowerCase().replace('/',''));
      // console.log(manaArr)
      return(
        manaArr.map((val)=> <i key={key++} className={`ms ms-${val} ms-cost ms-shadow`}></i>)
      )
    }
  }

  getCardAmount(amount, superType){
    if(amount > 4 && superType[0] !== 'Basic'){
      //too many
      return <span className="red textShadows">{amount}x</span>
    } else {
      return <span className="textShadows">{amount}x</span>
    }
  }

  getColor(card){
    if(card.colors){
      if(card.colors.length > 1){
        return 'gold'
      }
      if(card.colors.length === 0){
        return 'colorless'
      }
      if(card.colors[0] === 'Green'){
        return 'forest'
      }
      if(card.colors[0] === 'Blue'){
        return 'island';
      }
      if(card.colors[0] === 'Red'){
        return 'mountain';
      }
      if(card.colors[0] === 'White'){
        return 'plains';
      }
      if(card.colors[0] === 'Black'){
        return 'swamp';
      }
    }
  }

  getCollection(){
    let cardCounts = {}
    let collection = this.props.collection;
    let nonDupCollection = [];
    for(let x = 0; x < collection.length; x++){
      if(cardCounts[collection[x].name] === undefined){
        cardCounts[collection[x].name] = 1;
        nonDupCollection.push(collection[x]);
      } else {
        cardCounts[collection[x].name]++;
      }
    }
    //sort by cmc
    nonDupCollection.sort((a, b) => a.cmc - b.cmc);

    return(
      <div>
        {nonDupCollection.map((card)=>{
          return (<div onClick={()=>this.props.currentCard(card)} className={`deckListing ${this.getColor(card)}`}>
            <div>{this.manaParse(card)}</div>
            <div className="textShadows">{this.getCardAmount(cardCounts[card.name], card.supertypes)} {card.name}</div>
            <div className="textShadows">{card.type}</div>

          </div>)
        })}
      </div>
    )

  }

  render(){
    return(
      <div className="deckList">
        <div className="buttonZone">
          <button onClick={()=> this.props.saveDeck()}>Save Deck</button>
          <button>Load Deck</button>
          <label>
            <input type="text" id="deckId" value={this.props.currentId}></input>
          </label>
          <button className="floatRight">Delete Deck</button>
        </div>
        <div className="cardTab">
          {this.getCollection()}
        </div>
      </div>
    )
  }
}

export default Deck;




import React from 'react'

class CardDetails extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentCard: {name: 'cool'},
    }
    this.test = this.test.bind(this);
  }

  test(card){
    console.log('very cool test');
    this.setState({currentCard: card});
  }

  render(){
    return(
      <div className="cardDetails">
        {this.props.card.name}
        test
      </div>
    )
  }





}

export default CardDetails;


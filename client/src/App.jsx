import React from 'react';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    //functions
    this.getCard = this.getCard.bind(this);
  }


  componentDidMount(){
    this.getCard({name:"black lotus"});
  }

  getCard(query){
    let jsonQuery = JSON.stringify(query)
    console.log(jsonQuery);
    fetch(`/api/mtg/?params=${jsonQuery}`)
    .then(cards => cards.json())
    .then(cards => console.log(cards[0].text))
    .catch(err => console.log('error!: ' + err))
  }

  render(){
    return(
      <div>test react element</div>
    );
  }
}

export default App;




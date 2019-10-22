import React from 'react';
import SearchBar from './components/search_bar.jsx';
import Display from './components/display.jsx';
import PageBar from './components/page_bar.jsx';



class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentSearch: '',
      searchResult: [],
      allCard:[],
      page: 1,
      totalRes: 0,

    };
    //functions
    this.getCard = this.getCard.bind(this);

  }


  componentDidMount(){
    this.getCard({
      name:"a",
      'page':1,
      'pageSize':20,
    });
  }

  getCard(query){


    let jsonQuery = JSON.stringify(query);

    jsonQuery = jsonQuery.toLowerCase();

    console.log(jsonQuery);
    fetch(`/api/mtg/?params=${jsonQuery}`)
    .then(cards => cards.json())
    .then(cards => {
      console.log(cards);
      if(cards === []){
        console.log('no results TODO')
        query = [{name:'No Card Matches'}];
      }
      console.log('is array? ' + Array.isArray(cards));
      this.setState({
        'currentSearch':query,
        'searchResult':cards.data.slice(0, 25), //pg size 25
        'allCard': cards.data,
        'totalRes': cards.total_cards,
      });
      //console.log(cards[0].text)
    })
    .catch(err => console.log('error!: ' + err))
  }

  render(){
    return(

      <div>
        <SearchBar getCard={this.getCard}/>
        <Display cards={this.state.searchResult}/>
        <PageBar cardNum={this.state.totalRes} currentPage ={this.state.page}/>
      </div>
    );
  }
}

export default App;




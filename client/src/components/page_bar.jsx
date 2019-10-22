import React from 'react';

class PageBar extends React.Component{
  constructor(props){
    super(props);
    this.state = {

    }

  }

  getButtons(){
    console.log('getting buttons for ', this.props.cardNum, ' results')
    let pages = Math.ceil(this.props.cardNum / 25)
    let page = this.props.currentPage;
    let buttons = [];
    for(let x = 0; x < pages; x++){
      buttons.push(<button>push to get:{x}</button>);
    }
    if(page < 4){
      console.log('getting first seven');
      buttons = buttons.slice(0,7);
    } else if(page > (pages - 3)){
      buttons = buttons.slice((pages - 7), pages);
      console.log('getting last seven');
    } else {
      console.log('getting seven');
      buttons = buttons.slice(page - 3, page + 3);
    }
    return buttons
  }



  // componentDidMount(){

  // }
  render(){
    return(
      <div>{this.getButtons()}</div>
    )
  }
}

export default PageBar

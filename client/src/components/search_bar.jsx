import React from 'react';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 'name',
      page: 1,
    };
    this.createQuery = this.createQuery.bind(this);
    this.updateSearchBy = this.updateSearchBy.bind(this);
  }

  //default page size is 20
  createQuery(){

    let query={
      'page':this.state.page,
      'pageSize':20,
    };
    query[this.state.value] = document.getElementById('card').value;
    if(this.state.value === "color"){
      query.color = query.color.replace(', ',',');
      query.color = "\"" + query.color + "\"" //strict search
    }

    return query;
  }

  updateSearchBy(event){
    console.log(event.target.value);
    this.setState({'value':event.target.value});
  }


  render(){
    return(
      <div className="searchBar">
            <label>Search By:
              <select onChange={this.updateSearchBy} value={this.state.value}>
                <option value="name">Name</option>
                <option value="subtypes">Subtype</option>
                <option value="text">Text</option>
                <option value="colors">Color</option>
              </select>

              <input type="text" id="card"></input>
            </label>
            <button onClick={() => this.props.getCard.call(null, this.createQuery())}>Search</button>
      </div>
    )
  }
}

export default SearchBar;



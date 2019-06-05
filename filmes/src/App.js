import React, { Component } from 'react';
import AppService from './service/index';
import Cards from './component/cards';

const films = ['Toy Story 2', 'Creed', 'Hacksaw Ridge', 'Revenge of the Sith', 'Solo: A Star Wars Story', 'Rogue One: A Star Wars Story', 'The Empire Strikes Back',  'Return of the Jedi','The Force Awakens', 'The Last Jedi'];

class App extends Component {
  state = {
    data: [],
    session: true,
  }
 
  async componentDidMount(){
    await films.map(values => AppService.getFilm(values).then(data => {
      this.setState({ data: [ ...this.state.data, data],loading:false });
    }));
  }

  render(){
    return (
    <div>
      <Cards data={this.state.data} session={false}/>
    </div>
    );
  }
}
export default App;

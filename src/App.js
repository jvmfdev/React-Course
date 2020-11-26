import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';



class App extends Component {

  /*we moved the presentational component into the Main Component*/
  render() {
        return (
            <div className="App">
               <Main/>
            </div>
        );
    }
}

export default App;
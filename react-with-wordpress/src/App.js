import React, {Component} from 'react';
import Home from './components/Home';
import {Router} from "@reach/router";
import SinglePost from './components/SinglePost';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <Router>
          <Home path="/"/>
          <SinglePost path="/post/:id"/>
        </Router>
      </div>
    );
  }
}

export default App;

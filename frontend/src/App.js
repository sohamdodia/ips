/* global io */

import React, { Component } from 'react';
import IPList from './ips.js';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ips: [],
      socket: undefined
    }
  }
  
  //Inject socket.io and event listeners only once when react render's for the first time.
  componentDidMount () {

    let socket = io();

    //Update IPs list when user connects to the server or disconnects from the server
    socket.on('ips', ipsFromServer => {
      this.setState({
        ips: ipsFromServer,
        socket
      });
    });
  }
  
  //Rendering IPs
  render() {
    return (
      <div className="App">
        <h3>List of IPs accessing this page</h3>
        <IPList ips={this.state.ips} />
      </div>
    );
  }
}

export default App;

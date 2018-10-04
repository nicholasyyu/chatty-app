import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

const uuidv1 = require('uuid/v1');

class App extends Component {
	constructor(props) {
    	super(props);
    	// this is the *only* time you should assign directly to state:
    	this.state = {
    		loading: true,
    		currentUser: {name: ""},
    		messages: []
    	};

    	this.addMessage = this.addMessage.bind(this);
    	this.addUser = this.addUser.bind(this);

  	}

  	componentDidMount() {
  	// After 3 seconds, set `loading` to false in the state.
  		console.log("componentDidMount <App />");
  		this.webSocket = new WebSocket("ws://localhost:3001");
  		this.webSocket.onopen = function(){
  			console.log("server connected.");
  		};
  		setTimeout(() => {
		    this.setState({loading: false});
		}, 3000);
		this.webSocket.onmessage = (event) => {
			const tempData = JSON.parse(event.data);
			const newData = {uid: tempData.uid, username: tempData.username, content: tempData.content};
			const messages = this.state.messages.concat(newData);
  			this.setState({messages: messages});
		};

  	}

  	addMessage(e){
  		
  		if(e.key == "Enter"){
  			const newMessage = {uid: uuidv1(), username: this.state.currentUser.name, content: e.target.value};
  			this.webSocket.send(JSON.stringify(newMessage));
  			newMessage.value = "";
  		}

    }

    addUser(e){
		this.setState({currentUser: {name:e.target.value}});
    }

	render() {

			const { loading, messages } = this.state;

    	    if (loading) {
		      return <h1>Loading...</h1>
		    } else {
		      return (
		      		<div>
		      			<nav className="navbar">
				  			<a href="/" className="navbar-brand">Chatty</a>
						</nav>
		      			<MessageList messages={messages}/>
						<ChatBar addUserApp={this.addUser} addMessageApp={this.addMessage} />
					</div>	
		      	)
		    }

  	}
}
export default App;

import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
	constructor(props) {
    	super(props);
    	// this is the *only* time you should assign directly to state:
    	this.state = {
    		loading: true,
    		messages: [
    		{
    			uid: "001",
    			type: "incomingMessage",
			    content: "I won't be impressed with technology until I can download food.",
			    username: "Anonymous1"
			},
		  	{
		  		uid: "002",
		    	type: "incomingMessage",
		    	content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
		    	username: "Anonymous2"
		  	},
			{
				uid: "003",
			    type: "incomingMessage",
			    content: "...",
			    username: "nomnom"
			},
		    {
		    	uid: "004",
		        type: "incomingNotification",
		    	content: "Anonymous1 changed their name to nomnom",
		  	}
			]
    	};

    	this.keyPress = this.keyPress.bind(this);

  	}

  	componentDidMount() {
  	// After 3 seconds, set `loading` to false in the state.
  		console.log("componentDidMount <App />");
  		setTimeout(() => {
  			console.log("Simulating incoming message");
		    // Add a new message to the list of messages in the data store
		    const newMessage = {uid: 3, username: "Michelle", content: "Hello there!"};
		    const messages = this.state.messages.concat(newMessage);
		    // Update the state of the app component.
		    // Calling setState will trigger a call to render() in App and all child components.
		    this.setState({loading: false, messages: messages});
		    console.log(messages);
		}, 3000);

  	}

  	keyPress(e){
  		
  		if(e.key == "Enter"){
  			console.log('value', e.target.value);
  			const newMessage = {uid: 39, username: "e.target.name", content: e.target.value};
  			const messages = this.state.messages.concat(newMessage);
  			this.setState({loading: false, messages: messages});
  		}

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
						<ChatBar userName={messages[0].username} keyPressApp={this.keyPress} />
					</div>	
		      	)
		    }

  	}
}
export default App;

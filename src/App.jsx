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
      		currentUser: {name: "default user"},
          notification: {notice:""},
      		messages: [],
          userNumber: {count: ""}

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

		  }, 1000);

  		this.webSocket.onmessage = (event) => {

        //console.log(event.data);

  			const tempData = JSON.parse(event.data);

        //console.log(tempData);

        switch(tempData.type) {

          case "incomingMessage":
          // handle incoming message
          const newData = {uid: tempData.uid, username: tempData.username, content: tempData.content};

          const messages = this.state.messages.concat(newData);

          this.setState({messages: messages});
          break;

          case "incomingNotification":
          // handle incoming notification
          const newNotice = {uid: tempData.uid, type: tempData.type, content: tempData.content};

          this.setState({notification: {notice: newNotice.content}});
          
          break;

          case "counter":
          // handle incoming notification
          this.setState({userNumber: {count: tempData.number}});
          
          break;
            
          default:
            // show an error in the console if the message type is unknown
            throw new Error("Unknown event type " + tempData.type);
        }





  		};

  	}

  	addMessage(e){
  		
  		if(e.key == "Enter"){

  			const newMessage = {uid: uuidv1(), type: "postMessage", username: this.state.currentUser.name, content: e.target.value};
  			
        this.webSocket.send(JSON.stringify(newMessage));
  			
        newMessage.value = "";

  		}

    }

    addUser(e){
		  
      if(e.key == "Enter"){

        //console.log("user changed name" + this.state.currentUser.name);

        const userNameNotice = {uid: uuidv1(), type: "postNotification", content: this.state.currentUser.name + " changed name to " + e.target.value};

        this.webSocket.send(JSON.stringify(userNameNotice));

        this.setState({currentUser: {name:e.target.value}});
      
      }

    }

	render() {

			const { loading, messages, notification } = this.state;

    	    if (loading) {

		        return <h1>Loading...</h1>

		      } else {

  		      return (
  		      		<div>
  		      			<nav className="navbar">

  				  			 <a href="/" className="navbar-brand">Chatty</a>

                   <p className="userNumber">{this.state.userNumber.count} online users.</p>

  						    </nav>

  		      			<MessageList messages={messages} notification={notification}/>

  						    <ChatBar addUserApp={this.addUser} addMessageApp={this.addMessage} />
                </div>	
  		      )
		      }
      }

}

export default App;

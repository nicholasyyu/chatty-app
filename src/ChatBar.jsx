import React, {Component} from 'react';

class ChatBar extends Component {
	render() {
    	return (
    		<footer className="chatbar">
  			<input className="chatbar-username" placeholder={this.props.userName} 
  			value={this.props.value} onKeyDown={this.props.addUserApp} />
  			<input className="chatbar-message" placeholder="Type a message and hit ENTER" 
  			value={this.props.value} onKeyDown={this.props.addMessageApp} />
			</footer>
    	);
  	}
}

export default ChatBar;
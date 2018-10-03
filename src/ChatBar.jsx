import React, {Component} from 'react';

class ChatBar extends Component {
	render() {
    	return (
    		<footer className="chatbar">
  			<input className="chatbar-username" placeholder={this.props.userName} />
  			<input className="chatbar-message" placeholder="Type a message and hit ENTER" 
  			value={this.props.value} onKeyDown={this.props.keyPressApp} />
			</footer>
    	);
  	}
}

export default ChatBar;
import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {

		console.log(this.props.messages);

		const listMessages = this.props.messages.map((message) =>

				<Message key={message.uid} message={message} />);
	

		return (<main className="messages"><ul>{listMessages}</ul></main>);

	}

  }

export default MessageList;
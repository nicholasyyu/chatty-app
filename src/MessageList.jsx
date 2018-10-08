import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
	render() {

		//console.log(this.props.messages);

		const listMessages = this.props.messages.map((message) =>

				<Message key={message.uid} message={message} />);
	

		return (
			<div>
			<div className="messages">
			<span className="system">{this.props.notification.notice}</span>
			<ul>{listMessages}</ul>
			</div>
			</div>
		);

	}

  }

export default MessageList;
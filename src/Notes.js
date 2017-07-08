import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import ContentEditable from 'react-contenteditable';
import './Notes.css';

function ListItem(props) {
	return (
		<div className="Note">
			<ContentEditable className="noteData" html={props.title} disabled={false} onChange={props.onChange} />
			<div className="removeIcon" onClick={props.remove}><FontAwesome name="remove" /></div>
		</div>
	)
}

class Notes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes : [
				{id: 1, title: "Hello World!"}
			],
			next_id : 2
		}
	}

	addNote() {
		let value = document.getElementById('addNote').value;
		document.getElementById('addNote').value = '';
		if (value) {
			let newList = this.state.notes.slice();
			newList.push({id : this.state.next_id++, title : value});
			this.setState({notes : newList});
		}
	}

	modifyNote(i) {
		let value = document.getElementsByClassName('noteData')[i].innerHTML;
		let newList = this.state.notes.slice();
		newList[i].title = value;
		this.setState({notes: newList});
	}

	removeNote(i) {
		let newList = this.state.notes.slice();
		newList.splice(i, 1);
		this.setState({notes: newList});
	}

	handleKeyDown = (e) => e.keyCode === 13 ? document.getElementById('addNoteButton').click() : null;

	render() {
		let listItems = [];
		this.state.notes.forEach((item, i) => {
			listItems.push(<ListItem key={item.id} title={item.title} remove={() => this.removeNote(i)} onChange={() => this.modifyNote(i)} />)
		});
		return (
			<div className="Notes">
				<input id='addNote' type='text' className="form-control" placeholder="add new note"  onKeyDown={this.handleKeyDown} />
				<button id='addNoteButton' type='button' className="btn btn-default" onClick={() => this.addNote()}>Add</button>
				<div>
					{listItems}
				</div>
			</div>
		)
	}
}

export default Notes;

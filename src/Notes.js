import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import Note from './Note';
import './Notes.css';

class Notes extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [{ id: 1, title: 'Hello World!', content: 'Today is gonna be a good day!' }],
			next_id: 2,
			collapsableOpen: false
		};
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	addNote() {
		let title = document.getElementById('addNoteTitle').value;
		let content = document.getElementById('addNoteContent').value;
		if (title || content) {
			let newList = this.state.notes.slice();
			newList.push({ id: this.state.next_id++, title: title, content: content });
			this.setState({ notes: newList });
			this.closeCollapsable();
		}
	}

	modifyNote(i) {
		let newList = this.state.notes.slice();
		newList[i].title = document.getElementById('formTitle').value;
		newList[i].content = document.getElementById('formContent').value;
		this.setState({ notes: newList });
	}

	removeNote(i) {
		let newList = this.state.notes.slice();
		newList.splice(i, 1);
		this.setState({ notes: newList });
	}

	handleKeyDown(e) {
		e.keyCode === 13
			? document.getElementById('addNoteButton').click()
			: e.keyCode === 27 ? this.closeCollapsable() : null;
	}

	closeCollapsable() {
		this.setState({ collapsableOpen: false });
		document.getElementById('addNoteTitle').value = '';
		document.getElementById('addNoteContent').value = '';
		document.getElementById('addNoteTitle').placeholder = 'add new note';
		document.activeElement.blur();
	}

	render() {
		let listItems = [];
		this.state.notes.forEach((item, i) => {
			listItems.push(
				<Note
					key={item.id}
					title={item.title}
					content={item.content}
					remove={() => this.removeNote(i)}
					onChange={() => this.modifyNote(i)}
				/>
			);
		});
		return (
			<div className="Notes">
				<input
					id="addNoteTitle"
					type="text"
					className="form-control"
					placeholder="add new note"
					onKeyDown={this.handleKeyDown}
					onClick={() => {
						this.setState({ collapsableOpen: true });
						document.getElementById('addNoteTitle').placeholder = 'title';
					}}
				/>
				<Collapse in={this.state.collapsableOpen}>
					<div>
						<input
							id="addNoteContent"
							type="text"
							className="form-control"
							placeholder="content"
							onKeyDown={this.handleKeyDown}
						/>
					</div>
				</Collapse>
				<button
					id="addNoteButton"
					type="button"
					className="btn btn-default"
					onClick={() => this.addNote()}
				>
					Add
				</button>
				<div>
					{listItems}
				</div>
			</div>
		);
	}
}

export default Notes;

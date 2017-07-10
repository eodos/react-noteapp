import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { withCookies } from 'react-cookie';
import Note from './Note';
import './Notes.css';

class Notes extends Component {
	constructor(props) {
		super(props);
		const { cookies } = this.props;
		this.state = {
			notes: cookies.get('notes') || [
				{ id: 1, title: 'Hello World!', content: 'Today is gonna be a good day!' }
			],
			next_id: cookies.get('next_id') || 2,
			collapsableOpen: false
		};
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	addNote() {
		let title = document.getElementById('addNoteTitle').value;
		let content = document.getElementById('addNoteContent').value;
		if (title || content) {
			let newList = this.state.notes.slice();
			newList.push({ id: this.state.next_id, title: title, content: content });
			const { cookies } = this.props;
			cookies.set('notes', newList, { path: '/' });
			cookies.set('next_id', this.state.next_id + 1);
			this.setState({ notes: newList });
			this.setState({ next_id: this.state.next_id + 1 });
			this.closeCollapsable();
		}
	}

	modifyNote(i) {
		let newList = this.state.notes.slice();
		newList[i].title = document.getElementById('formTitle').value;
		newList[i].content = document.getElementById('formContent').value;
		const { cookies } = this.props;
		cookies.set('notes', newList, { path: '/' });
		this.setState({ notes: newList });
	}

	removeNote(i) {
		let newList = this.state.notes.slice();
		newList.splice(i, 1);
		const { cookies } = this.props;
		cookies.set('notes', newList, { path: '/' });
		this.setState({ notes: newList });
	}

	handleKeyDown(e) {
		if (e.keyCode === 13) {
			document.getElementById('addNoteButton').click();
		} else if (e.keyCode === 27) {
			this.closeCollapsable();
		}
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

export default withCookies(Notes);

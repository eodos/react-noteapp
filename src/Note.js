import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Button, Modal, Form, FormGroup, Col, ControlLabel, FormControl } from 'react-bootstrap';
import './Note.css';

class Note extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	handleKeyDown(e) {
		e.keyCode === 13 ? document.getElementById('formSubmit').click() : null;
	}

	render() {
		return (
			<div className="Note">
				<div className="noteData" onClick={this.open}>
					<h4>
						{this.props.title}
					</h4>
					<p>
						{this.props.content}
					</p>
				</div>
				<div className="removeIcon" onClick={this.props.remove}>
					<FontAwesome name="remove" />
				</div>

				<Modal show={this.state.showModal} onHide={this.close}>
					<Modal.Body>
						<Form horizontal>
							<FormGroup controlId="formTitle">
								<Col componentClass={ControlLabel} sm={2}>
									Title
								</Col>
								<Col sm={10}>
									<FormControl
										type="text"
										defaultValue={this.props.title}
										onKeyDown={this.handleKeyDown}
									/>
								</Col>
							</FormGroup>

							<FormGroup controlId="formContent">
								<Col componentClass={ControlLabel} sm={2}>
									Content
								</Col>
								<Col sm={10}>
									<FormControl
										type="text"
										defaultValue={this.props.content}
										onKeyDown={this.handleKeyDown}
									/>
								</Col>
							</FormGroup>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button
							id="formSubmit"
							onClick={() => {
								this.props.onChange();
								this.close();
							}}
						>
							Save
						</Button>
						<Button onClick={this.close}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default Note;

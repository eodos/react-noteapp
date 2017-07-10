import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Notes from './Notes.js';

class App extends Component {
	render() {
		return (
			<CookiesProvider>
				<div className="App">
					<Header />
					<Notes />
					<Footer />
				</div>
			</CookiesProvider>
		);
	}
}

export default App;

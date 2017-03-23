import React, { Component } from 'react';
import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import Notes from './Notes.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header />
                <Notes />
                <Footer />
            </div>
        );
    }
}

export default App;

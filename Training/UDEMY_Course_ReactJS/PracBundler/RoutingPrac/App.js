import React, { Component } from 'react';
import hello from './helloComponent';
import about from './aboutComponent';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <ul>
                            <li><Link to="/hello">Hello</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                        <hr/>
                        <Route path="/hello" component={hello} />
                        <Route path="/about" component={about} />
                    </div>
                </div>
            </Router>
        );
    }
}
  
export default App;
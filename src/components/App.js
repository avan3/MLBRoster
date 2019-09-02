import React from 'react';
import Team from './Team';
import Home from './Home';
import Roster from './Roster';
import Player from './Player';
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
                <div>
                    <Route exact path="/" component={Home} />  
                    <Route exact path="/team" component={Team} />
                    <Route exact path="/roster" component={Roster} />
                    <Route exact path="/player" component={Player} />
                </div>
            </Router>
        );
    };
};

export default App;
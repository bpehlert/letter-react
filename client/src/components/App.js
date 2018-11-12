import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';


import Header from './Header'
import Landing from './Landing';
const Entries = () => <h2>Entries</h2>
const EntryNew = () => <h2>EntryNew</h2>

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render () {
        return (
            <div className = 'container'>
                <BrowserRouter>
                    <div>   
                        <Header />
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/entries' component={Entries} />
                        <Route exact path='/entries/new' component={EntryNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }       
};

export default connect(null, actions)(App);
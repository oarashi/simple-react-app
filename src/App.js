import React, { Component } from 'react';
import { Provider } from 'react-redux';
import getStore from 'redux/store';
import Layout from 'components/Tables';
import './App.css';

const store = getStore();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Layout></Layout>
                </div>
            </Provider>
        );
    }
}

export default App;

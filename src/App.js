import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Login from './components/Login'
import Main from './main'
import './App.css'


export default class App extends Component {
    //test
    render() {
        return (
            <div>
                    {/* <Link to="/Login"></Link> */}
                    <Route exact path="/" component={Login}/>
                    <Route path="/main" component={Main}/>
                    
                    
                
            </div>
        )
    }
}

import React, { Component } from "react";
import {Route} from "react-router-dom";
import home from "./pages/home";
import message from "./pages/message";
import LoginAndSignup from './pages/loginAndSignup';
import "./App.css" ;




class App extends Component {
    render(){
    return( 
    <div>
    <Route path="/post" component={home} exact/>
    <Route path="/chats" component={message} />
    <Route path="/login" component={LoginAndSignup} exact/>    
        
        </div>
    );
}
}

export default App;
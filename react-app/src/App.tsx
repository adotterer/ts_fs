import React from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import "./main.css";

export default function App(){
  return (
  
        <div>
          <Switch>
            <Route path="/login">
              {/* <LoginForm /> */}
              da fuck
            </Route>
            <Route path="/" exact>
              hello
              <br />
              <Link to="/login">Login</Link>
            </Route>
          
          </Switch>
        </div>
  );
}

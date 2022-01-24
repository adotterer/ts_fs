import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import "./main.css";

export default function App(){
  return (
  
        <div>
          <Switch>
            <Route path="/login">
              {/* <LoginForm /> */}
              fuck off
            </Route>
            <Route path="/" exact>
              hello
            </Route>
          </Switch>
        </div>
  );
}

import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LoginForm from "./components/LoginForm";
import "./main.css";

export default function App(): JSX.Element {
  return (
    <div className='bg-black h-screen w-screen'>
      <span className='font-extrabold text-3xl text-white'>
        
        <Switch>
          <Route path="/" exact={true}>
            /
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>

        </Switch>
      </span>
    </div>
  );
}

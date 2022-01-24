import React, {useState, FormEvent} from "react";
import * as sessionActions from "../../store/session";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import { AppState } from '../../store';

export default function LoginForm(): JSX.Element {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const sessionUser = useSelector((state: AppState) => state.session.user)
    // if (sessionUser) return <Redirect to="/" />

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        try { 
            dispatch(sessionActions.login({email, password}))
        } catch(e) {
            console.log(e, "error".padEnd(30, "_"))
        }
    }

    return (
    <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="name">
            Email
        </label>
        <input 
            name="email" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email address"
            required
        >
        </input>
        <label htmlFor="password">
            Password
        </label>
        <input 
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
        >
        </input>
        <button type="submit">Submit</button>
    </form>)
}
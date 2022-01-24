import React, {useState, FormEvent} from "react";
import * as sessionActions from "../../store/session";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import { AppState } from '../../store';
import Response from "http"
export default function LoginForm(): JSX.Element {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const sessionUser = useSelector((state: AppState) => state.session.user)

    const handleSubmit = (e: FormEvent) => {
        
        try { dispatch(sessionActions.login({email, password}))
        } catch(e) {
            console.log(e, "error".padEnd(30, "_"))
        }
           

    }
    return (<form onSubmit={handleSubmit}></form>)
}
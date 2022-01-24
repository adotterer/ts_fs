import React, {useState, FormEvent} from "react";
import * as sessionACtions from "../../store/session";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import { AppState } from '../../store';

export default function LoginForm(): JSX.Element {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state: AppState) => state.session.user)

    const handleSubmit = (e: FormEvent) => {
        


    }
    return (<form onSubmit={handleSubmit}></form>)
}
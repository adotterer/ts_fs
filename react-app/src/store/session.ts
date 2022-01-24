import { csrfFetch } from "./csrf";
import {Dispatch} from "redux"

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export type sessionState = {
    user: any
}

export type sessionAction = {
    type: string,
    user?: any
}

export type credentials = {
    email: string,
    password: string
}


const setUser = (user: any): sessionAction => ({
    type: SET_USER,
    user
})


const removeUser = (): sessionAction => ({
    type: REMOVE_USER
})

export const login = ({email, password}: credentials) => async (dispatch: Dispatch<sessionAction>): Promise<Response>=> {
    const res = await csrfFetch("/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password, 
        })
    })
    // console.log(await res.json(), "login response.json()")
    dispatch(setUser(res))
    return res
}

export default function reducer(
    state: sessionState = {user: null}, 
    {type, user}: sessionAction
): sessionState {
    switch(type) {
        case SET_USER:
            return {
                ...state,
                user
            };
        case REMOVE_USER:
            return {
                ...state,
                user: null
            };
        default: 
            return state
    }
}
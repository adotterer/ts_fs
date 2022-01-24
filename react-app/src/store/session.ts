import { csrfFetch } from "./csrf";
import {Dispatch} from "redux"

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export type sessionState = {
    username: string
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

export const login = ({email, password}: credentials) => async (dispatch: Dispatch<sessionAction>) => {
    
}

import { csrfFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

export type sessionState = {
    username: string
}

export type sessionAction = {
    type: string,
    user?: any
}
const setUser = (user: any): sessionAction => {
    return {
        type: SET_USER,
        user
    }
}
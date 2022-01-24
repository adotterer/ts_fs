import React from "react"
import Modal from './components/Modal';
import {Provider} from "react-redux";
import configureStore from "./store/index";
const store = configureStore(undefined);

export default function TestComponent({children}: {children: JSX.Element}): JSX.Element {
    return (
        <Provider store={ store }>
           {children}
            <Modal />
        </Provider>
        )
}
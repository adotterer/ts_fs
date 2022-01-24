import React from "react"
import {render, fireEvent, screen} from '@testing-library/react'
import {Provider, useDispatch} from "react-redux";
import { ShowModal, HideModal, SetModalCurrent} from "../modal"
import Modal from '../../components/Modal';
import configureStore from "../index";


const store = configureStore(undefined);

function TestModal(): JSX.Element {
    return <h1>Hello from Modal</h1>
}

function TestApp(): JSX.Element {
    const dispatch = useDispatch();
    dispatch(SetModalCurrent(TestModal))
    return  (
    <div>
        <button
            onClick={() => dispatch(ShowModal())}
        >
            Open Modal
        </button>
        <button
            onClick={() => dispatch(HideModal())}
        >
            Close Button
        </button>
    </div>)
}

function Test(): JSX.Element {
    return (
        <Provider store={ store }>
           <TestApp />
            <Modal />
        </Provider>
        )
}

describe("Modal", () => {
    test("should appear when you dispatch ShowModal", () => {
        render(<Test />);
        const openButton = screen.getByRole("button", {name: /Open/i})
        openButton.click();
        expect(screen.getByText("Hello from Modal")).toBeInTheDocument()

    })
})
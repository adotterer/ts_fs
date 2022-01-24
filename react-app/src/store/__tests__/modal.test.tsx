import React from "react"
import {render, screen} from '@testing-library/react'
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

export function Test({children}: {children: JSX.Element}): JSX.Element {
    return (
        <Provider store={ store }>
           {children}
            <Modal />
        </Provider>
        )
}

describe("Modal", () => {
    test("should appear when you dispatch ShowModal", () => {
        render(<Test><TestApp /></Test>);
        const openButton = screen.getByRole("button", {name: /Open/i})
        openButton.click();
        expect(screen.getByText("Hello from Modal")).toBeInTheDocument()

    })
})
import React from "react"
import {render, screen} from '@testing-library/react'
import { useDispatch } from "react-redux";
import { ShowModal, HideModal, SetModalCurrent} from "../modal"
import TestComponent from "../../TestComponent"

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

describe("Modal", () => {
    test("should appear on dispatch ShowModal", () => {
        render(<TestComponent><TestApp /></TestComponent>);
        const openButton = screen.getByRole("button", {name: /Open/i})
        openButton.click();
        expect(screen.getByText(/Hello/i)).toBeInTheDocument()
    })
    test("should close on dispatch HideModal", () => {
        render(<TestComponent><TestApp /></TestComponent>);
        const openButton = screen.getByRole("button", {name: /Open/i})
        const closeButton = screen.getByRole("button", {name: /Close/i})
        openButton.click();
        closeButton.click();
        expect(screen.queryByText("Hello from Modal")).not.toBeInTheDocument()
    })
})
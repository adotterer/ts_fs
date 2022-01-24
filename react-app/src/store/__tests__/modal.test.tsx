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
    test("should appear when you dispatch ShowModal", () => {
        render(<TestComponent><TestApp /></TestComponent>);
        const openButton = screen.getByRole("button", {name: /Open/i})
        openButton.click();
        expect(screen.getByText("Hello from Modal")).toBeInTheDocument()

    })
})
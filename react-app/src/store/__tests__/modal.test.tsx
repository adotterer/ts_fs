import React from "react"
import {render, fireEvent, screen} from '@testing-library/react'
import {useDispatch} from "react-redux";
import {ShowModal, HideModal, SetModalCurrent} from "../modal"

function TestModal(): JSX.Element {
    return <h1>Hello from Modal</h1>
}
function Test(): JSX.Element {
    const dispatch = useDispatch();
    dispatch(SetModalCurrent(TestModal))

    return (
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
        </div>
        )
}

describe("Modal", () => {
    test("should appear when you dispatch ShowModal", () => {
        const {container} = render(<Test />);
        const openButton = screen.getByRole("button", {name: /Open/i})
        openButton.click();
        expect(screen.getByText("Hello")).toBeInTheDocument()

    })
})
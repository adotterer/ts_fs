import React from "react"
import {useDispatch} from "react-redux";
import {ShowModal, HideModal, SetModalCurrent} from "./store/modal"

function TestModal(): JSX.Element {
    return <h1>Hello from Modal</h1>
}
export default function Test(): JSX.Element {
    const dispatch = useDispatch();
    dispatch(SetModalCurrent(TestModal))

    return (
        <div>
            <button
                className="button highlight" 
                onClick={() => dispatch(ShowModal())}
            >
                Click here for modal poup
            </button>
            <button
                className="button no_highlight" 
                onClick={() => dispatch(HideModal())}
            >
                Click here for modal to hide
            </button>
        </div>
        )
}
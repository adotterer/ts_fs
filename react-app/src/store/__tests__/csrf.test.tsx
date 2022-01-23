import * as React from 'react'
import ReactDOM from 'react-dom';
import {render, fireEvent, screen} from "@testing-library/react"
import App from "../../App"

describe("csrf fetch", () => {
    test("it should work, yet it won't", async () => {
        const {container} = render(<App />)
        
        
    })
})
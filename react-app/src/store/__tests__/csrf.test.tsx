import * as React from 'react'
import {csrfFetch} from "../csrf"
import {render, fireEvent, screen} from "@testing-library/react"
import App from "../../App"
import Response from "http"

interface MockedResponse extends Response {
    json: () => Promise
}
describe("csrf fetch", () => {
    test("should pass on any headers sent in options", async () => {

        // const windowSpy = jest.spyOn(window, "fetch");
        const response: MockedResponse
        jest.spyOn(global, 'fetch').mockResolvedValue()
        await csrfFetch("/test", {
            method: "POST",
            headers: {"Content-Type": "test"},
            body: JSON.stringify({msg: "Hello world"})
        })
     
        delete global.fetch;
        
    })
})
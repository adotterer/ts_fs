import * as React from 'react'
import {csrfFetch } from "../csrf"
import {render, fireEvent, screen} from "@testing-library/react"
import App from "../../App"
/**
 * @jest-environment jsdom
 */

interface MockedResponse extends Response {
    json: () => Promise<void>
}

declare let Response: MockedResponse
describe("csrf fetch", () => {
    test("should pass on any headers sent in options", async () => {

    
        const options = {
            method: "POST",
            headers: {"Content-Type": "test"},
            body: JSON.stringify({msg: "Hello world"})
        }
    
        
        await csrfFetch("/test", options);

     
        expect(options.headers).toBe({"Content-Type": "test"})
        
    })
})
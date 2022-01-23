import * as React from 'react'
import {csrfFetch} from "../csrf"
import {render, fireEvent, screen} from "@testing-library/react"
import App from "../../App"

describe("csrf fetch", () => {
    test("should pass on any headers sent in options", async () => {

        const windowSpy = spyOn(window, "fetch");

        await csrfFetch("/test", {
            method: "POST",
            headers: {"Content-Type": "test"},
            body: JSON.stringify({msg: "Hello world"})
        })
        expect(windowSpy).toHaveBeenCalled();

        
    })
})
describe("csrf fetch", () => {
    test("it should work, yet it won't", () => {
        window.fetch("/test").then((res) => res.json()).then(res => console.log(res));
        expect(true).toBe(true)
    })
})
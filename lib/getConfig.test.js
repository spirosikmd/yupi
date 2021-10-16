const getConfig = require("./getConfig")
// @ponicode
describe("getConfig", () => {
    test("0", () => {
        let callFunction = () => {
            getConfig("path/to/file.ext")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            getConfig(".")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            getConfig("path/to/folder/")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            getConfig("./path/to/file")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            getConfig("C:\\\\path\\to\\folder\\")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            getConfig(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

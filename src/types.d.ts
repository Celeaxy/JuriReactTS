declare global {
    type InterpreterError = {
        message: string
        line: number
    }
    type InterpreterResult = {
        status: number =  0,
        standard: string[] = [],
        error: InterpreterError[] = [],
        meta: string[] = []
    }
}
export { }
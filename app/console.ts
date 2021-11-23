export function colorConsoleLog(text: string): void{
  console.log( `\x1b[35m${text}\x1b[35m`)
}

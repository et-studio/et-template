
/// <reference path="interfaces/value.d.ts" />
/// <reference path="interfaces/options.d.ts" />
/// <reference path="interfaces/node.d.ts" />

declare module 'et-parser' {
  export class Parser {
    constructor (table: string)
    parse(source: string, iterator: (state: string, token: string, index: number) => string | void): void
  }
}

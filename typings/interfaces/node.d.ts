
interface IOriginNode {
  nodeType: string | number
  nodeName: string
  source: string
  header: string
  html: string
  tail: string

  previous: IOriginNode
  next: IOriginNode
  parent: IOriginNode
  expressions: IOriginNode[]
  children: IOriginNode[]

  append (childNode: IOriginNode): void
  prepend (childNode: IOriginNode): void
  after (childNode: IOriginNode): void
  before (childNode: IOriginNode): void
  remove (): void
  getOuterHTML (): string
  getInnerHTML (): string
}

interface INode extends IOriginNode {
  id: number
  name: string
  isTemplate: boolean

  previous: INode
  next: INode
  parent: INode
  attributes: Map<string, string>
  dependencies:  Map<string, string>
  arguments: string[]
  expressions: INode[]
  children: INode[]

  parse (): void
  setIndex (id: number): void
  addDependency (name: string, path: string): void
  getArguments (): string[]
  getCreateList (): (string | ICreate)[]
}

interface ICreate {
  create: string
  patch: string
  update: string
}
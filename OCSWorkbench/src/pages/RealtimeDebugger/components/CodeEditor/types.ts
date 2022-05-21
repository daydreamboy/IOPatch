type AstLiteral = {
  literal: any
}

type AstMessageCall = {
  name: string
  args?: AstItem[]
}

type AstItem = AstLiteral | AstMessageCall

type CodeEditorCompileResult = {
  ast: AstItem[]
  code: string
}

type PatchWriteResult = {
  data: {
    ok: boolean
    errorMsg?: string
  }
}


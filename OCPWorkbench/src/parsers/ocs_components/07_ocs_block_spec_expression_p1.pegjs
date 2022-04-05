/// Syntax - Expression p1
///////////////////////
p1 = '(' S expression:expression S ')' {
  return expression
}
/ spec:block_spec {
  return [createCall('Weiwo'), createCall('createBlock:', [[createLiteral(spec)]])]
}
/ '^' S name:IDENTIFIER {
  return [createCall('awaitblock', [[ createLiteral(name) ]])]
}
/ declaration:declaration_group {
  return [createCall('Weiwo'), createCall('declareCFunctions:', [[createLiteral(declaration)]]) ]
}
/ '-' S list:item_list {
  return list.concat(createCall('weiwo_negate'))
}
/ item_list
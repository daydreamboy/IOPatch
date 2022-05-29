import Weiwo from "../../weiwo/weiwo";

export async function doCode(body, _spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"@@@","paramNames":["body"],"body":[{"name":"setSlot","args":[[{"literal":"jscodes"}],[{"name":"squareBrackets"}]]},{"name":";"},{"name":"setSlot","args":[[{"literal":"blockSpec"}],[{"name":"curlyBrackets","args":[[{"literal":"body"},{"name":":","args":[[{"name":"body"}]]}],[{"literal":"signature"},{"name":":","args":[[{"literal":"v@"}]]}],[{"literal":"options"},{"name":":","args":[[{"name":"curlyBrackets","args":[[{"literal":"on_global"},{"name":":","args":[[{"literal":true}]]}],[{"name":"jscodes"}]]}]]}]]}]]},{"name":";"},{"name":"$"},{"name":"createBlock:","args":[[{"name":"blockSpec"}]]},{"name":"call"},{"name":";"},{"name":"return","args":[[{"name":"jscodes"},{"name":"componentsJoinedByString:","args":[[{"literal":";"}]]}]]}],"name":"doCode"},
    [body],
    Weiwo.ContainerAsValue,
)}

export async function jsonStringFromObjectAddress(objAddr, _spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"@@@","paramNames":["objAddr"],"body":[{"name":"setSlot","args":[[{"literal":"obj"}],[{"name":"$"},{"name":"objectFromAddress:","args":[[{"name":"objAddr"}]]}]]},{"name":";"},{"name":"if","args":[[{"name":"obj"},{"name":"is","args":[[{"literal":"GPBMessage"}]]}],[{"name":"if","args":[[{"name":"obj"},{"name":"respondsToSelector:","args":[[{"literal":"toJson"}]]}],[{"name":"obj"},{"name":"toJson"},{"name":"btd_jsonStringEncoded"}],[{"name":"obj"},{"name":"toJsonForJS"},{"name":"btd_jsonStringEncoded"}]]}],[{"name":"$"},{"name":"class"},{"name":"safeEncodeJSONObject:","args":[[{"name":"obj"}]]}]]}],"name":"jsonStringFromObjectAddress"},
    [objAddr],
    Weiwo.ContainerAsValue,
)}

export async function inspectCall(address, methodName, args, onMainQueue, _spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"@@@@@B","paramNames":["address","methodName","args","onMainQueue"],"body":[{"name":"$"},{"name":"inspectCall:methodName:argumentStrings:onMainQueue:","args":[[{"name":"address"}],[{"name":"methodName"}],[{"name":"args"}],[{"name":"onMainQueue"}]]}],"name":"inspectCall"},
    [address, methodName, args, onMainQueue],
    Weiwo.ContainerAsValue,
)}

export async function inspectWeiwoGlobals(_spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"@@","paramNames":[],"body":[{"name":"$"},{"name":"inspectObject:options:","args":[[{"name":"$"},{"name":"userDict"}],[{"name":"curlyBrackets","args":[[{"literal":"count"},{"name":":","args":[[{"literal":1000}]]}],[{"literal":"hiddenPrefix"},{"name":":","args":[[{"literal":"."}]]}]]}]]}],"name":"inspectWeiwoGlobals"},
    [],
    Weiwo.ContainerAsValue,
)}

export async function watchWeiwoGlobalChangedEvent(_spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"B@","paramNames":[],"body":[{"name":"once","args":[[{"name":"_cmd"}],[{"name":"Weiwo"},{"name":"hookClass:","args":[[{"literal":{"className":"TBWeiwo","methods":[{"name":"setObject:forKeyedSubscript:","paramNames":["obj","key"],"methodType":"-","body":[{"name":"origin"},{"name":";"},{"name":"$"},{"name":"transientLog:","args":[[{"name":"curlyBrackets","args":[[{"literal":"type"},{"name":":","args":[[{"literal":"weiwo_global_changed"}]]}]]}]]}]}]}}]]}]]},{"name":";"},{"literal":true}],"name":"watchWeiwoGlobalChangedEvent"},
    [],
    Weiwo.ContainerAsValue,
)}

export async function jsonFromAddress(addr, _spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"@@@","paramNames":["addr"],"body":[{"name":"return","args":[[{"name":"$"},{"name":"class"},{"name":"jsonSafeObject:","args":[[{"name":"$"},{"name":"objectFromAddress:","args":[[{"name":"addr"}]]}]]}]]}],"name":"jsonFromAddress"},
    [addr],
    Weiwo.ContainerAsValue,
)}

export async function removeGlobal(name, _spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"v@@","paramNames":["name"],"body":[{"name":"$"},{"name":"userDict"},{"name":"removeObjectForKey:","args":[[{"name":"name"}]]}],"name":"removeGlobal"},
    [name],
    Weiwo.ContainerAsValue,
)}

export async function autoGlobal(addr, _spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"@@@","paramNames":["addr"],"body":[{"name":"setSlot","args":[[{"literal":"obj"}],[{"name":"$"},{"name":"objectFromAddress:","args":[[{"name":"addr"}]]}]]},{"name":";"},{"name":"setSlot","args":[[{"literal":"cls"}],[{"name":"obj"},{"name":"class"}]]},{"name":";"},{"name":"setSlot","args":[[{"literal":"className"}],[{"name":"$"},{"name":"inspect:","args":[[{"name":"cls"}]]},{"name":"weiwo_getSubscript:","args":[[{"literal":"name"}]]}]]},{"name":";"},{"name":"for","args":[[{"name":"setSlot","args":[[{"literal":"i"}],[{"literal":0}]]}],[{"name":"i"},{"name":"<","args":[[{"name":"className"},{"name":"length"}]]}],[{"name":"updateSlot","args":[[{"literal":"i"}],[{"name":"i"},{"name":"+","args":[[{"literal":1}]]}]]}],[{"name":"setSlot","args":[[{"literal":"c"}],[{"name":"className"},{"name":"characterAtIndex:","args":[[{"name":"i"}]]}]]},{"name":";"},{"name":"if","args":[[{"name":"!","args":[[{"name":"c"},{"name":"==","args":[[{"literal":95}]]},{"name":"||","args":[[{"name":"c"},{"name":">=","args":[[{"literal":65}]]},{"name":"&&","args":[[{"name":"c"},{"name":"<=","args":[[{"literal":90}]]}]]}]]}]]}],[{"name":"if","args":[[{"name":"i"},{"name":">","args":[[{"literal":0}]]}],[{"name":"updateSlot","args":[[{"literal":"i"}],[{"name":"i"},{"name":"-","args":[[{"literal":1}]]}]]}]]},{"name":";"},{"name":"break"}]]}]]},{"name":";"},{"name":"setSlot","args":[[{"literal":"first"}],[{"name":"className"},{"name":"substringWithRange:","args":[[{"name":"NSMakeRange","args":[[{"name":"i"}],[{"literal":1}]]}]]},{"name":"lowercaseString"}]]},{"name":";"},{"name":"setSlot","args":[[{"literal":"prefix"}],[{"name":"first"},{"name":"..","args":[[{"name":"className"},{"name":"substringFromIndex:","args":[[{"name":"i"},{"name":"+","args":[[{"literal":1}]]}]]}]]}]]},{"name":";"},{"name":"for","args":[[{"name":"setSlot","args":[[{"literal":"i"}],[{"literal":1}]]}],[{"literal":true}],[{"name":"updateSlot","args":[[{"literal":"i"}],[{"name":"i"},{"name":"+","args":[[{"literal":1}]]}]]}],[{"name":"setSlot","args":[[{"literal":"name"}],[{"name":"prefix"},{"name":"..","args":[[{"name":"i"},{"name":"stringValue"}]]}]]},{"name":";"},{"name":"if","args":[[{"name":"!","args":[[{"name":"$"},{"name":"weiwo_getSubscript:","args":[[{"name":"name"}]]}]]}],[{"name":"$"},{"name":"weiwo_setSubscript:value:","args":[[{"name":"name"}],[{"name":"obj"}]]},{"name":";"},{"name":"return","args":[[{"name":"name"}]]}]]}]]}],"name":"autoGlobal"},
    [addr],
    Weiwo.ContainerAsValue,
)}

export async function renameGlobal(oldName, newName, _spec = 0) {
  return await Weiwo.vm(_spec).callBlock(
    {"type":"block","signature":"v@@@","paramNames":["oldName","newName"],"body":[{"name":"$"},{"name":"weiwo_setSubscript:value:","args":[[{"name":"newName"}],[{"name":"$"},{"name":"weiwo_getSubscript:","args":[[{"name":"oldName"}]]}]]},{"name":";"},{"name":"$"},{"name":"userDict"},{"name":"removeObjectForKey:","args":[[{"name":"oldName"}]]}],"name":"renameGlobal"},
    [oldName, newName],
    Weiwo.ContainerAsValue,
)}

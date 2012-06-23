/*global
 jquery:true,
 $:true,
 us: true,
 require: true
*/

var _ = require("underscore")
var esprima = require("esprima")
var util = require("util")
var fs = require("fs")

function isLowercase(string) {
  var first = string.charAt(0)
  return first === first.toLowerCase() && first !== first.toUpperCase()
}

function makeFormattedParamList(paramList) {
  return "(" + _.map(paramList, function (param, index) {
    // tm tabbable placeholders - index + 1 is used because $0 is the last tab-stop
    return "${" + (index + 1) + ":" + param.name + "}"
  }).join(", ") + ")"
}

function findFunctionsInNode(node) {
  // if node is itself a named function node
  if (node.type === "FunctionDeclaration" && node.id && node.id.name && isLowercase(node.id.name)) {
    return [{
      "display": node.id.name,
      "insert": makeFormattedParamList(node.params)
     }]
  }
  // A variable declaration that assigns to an anonymous function: var x = function () {}
  // Can handle multiple declarations, e.g. var x = 7, y = function () {}, z = "zed"
  else if (node.type === "VariableDeclaration") {
    return _.reduce(node.declarations, function (prevDeclarationFunList, currDeclaration) {
      if (currDeclaration.init && currDeclaration.init.type === "FunctionExpression") {
        return prevDeclarationFunList.concat([{
          "display": currDeclaration.id.name,
          "insert": makeFormattedParamList(currDeclaration.init.params)
        }])
      }
      else {
        return []
      }
    }, [])
  }
  // A function assigned to a property: this.privilegedMethod = function () {}
  else if (node.type === "AssignmentExpression" && node.operator === "=" &&
    node.right.type === "FunctionExpression") {

    return [{
      "display": node.left.property.name,
      "insert": makeFormattedParamList(node.right.params)
    }]
  }
  // A function assigned to a property in an object literal: { objLiteralFun: function () {} }
  else if (node.type === "Property" && node.value.type === "FunctionExpression") {

    return [{
      "display": node.key.name,
      "insert": makeFormattedParamList(node.value.params)
    }]
  }
  else {
    return []
  }
}

function findFunctionsInAST(node) {
  // Turn on debugging:
  // console.log("Processing node")
  // console.log(node)
  // console.log("\n\n")

  var foundFunction = findFunctionsInNode(node)

  // recurse into each array/object property on the node
  return _.reduce(_.values(node), function (prevPropFunLists, currProp) {
    // if the property is a list of subnodes, recurse into each subnode
    if (_.isArray(currProp)) {
      // foldl all the funs found from all the nodes in the list into one list of funs and append
      // it to the running list of funs for this node's subnodes.
      return prevPropFunLists.concat(_.reduce(currProp, function (prevBlockFunLists, currBlock) {
        return prevBlockFunLists.concat(findFunctionsInAST(currBlock))
      }, []))
    }
    // else if it's just a single subnode, just recurse into that
    else if (_.isObject(currProp)) {
      return prevPropFunLists.concat(findFunctionsInAST(currProp))
    }
    // If it's not an object or array, it's a primitive property and not a subnode
    else {
      return prevPropFunLists
    }
  }, foundFunction) // start with an empty array for the foldl so the concat works smoothly in all cases
}

var fileContents;

try {
  fileContents = fs.readFileSync(process.argv[2])
} catch (exception) {
  console.log("Couldn't open current file to parse for functions. Error: ")
  console.log(exception)
}

var ast = esprima.parse(fileContents)
// uncomment the line below for easier debugging
// console.log(findFunctionsInAST(ast))
console.log(JSON.stringify(findFunctionsInAST(ast)))



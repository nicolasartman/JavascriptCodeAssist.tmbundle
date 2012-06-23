function funglobal (arg1, arg2) {
  var x = 6;
  
  function funInsideGlobal(arg3) {
    var q = 7;
    var g = 3;
  }
}

call(function () {
  var x = 4;
  
  function fun_inside_anon_fun() {
    "cheesy";
  }
})

function funglobal_noargs () {
  var x = 6;
}

var funlocal = function (arg1, arg2) {
  var x = 7;
}

function Obj () {
  this.funprop = function (arg1, arg2) {
  
  }
}

var obj = {
  fun_in_object_literal: function () {}
}

var fun_not_a_fun = 3;

var multi_declaration_not_fun = 7,
    multi_declaration_fun = function () {}


var invocation_not_declaration = call()
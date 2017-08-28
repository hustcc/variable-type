/**
 * Created by hustcc on 17/08/01.
 *
 * 👏 08-01 is my birthday on ID card.
 */


/**
 * what( v ) -> String : get what is the type of the input var.
 * @param v: the var which want to typeof
 * @returns {string}
 * https://github.com/hustcc/what.js
 */
function what(v) {
  if (v === null) return 'null';
  if (v !== Object(v)) return typeof v;
  return ({}).toString.call(v).slice(8, -1).toLowerCase();
}

var latest; // the latest check variable, for console.log / warn / error.
/**
 * check whether the variable match the type.
 * How to use it? You can see the example in test.js
 *
 * @param variable
 * @param type
 * @returns {boolean}
 */
function _check(variable, type) {
  try {
    latest = variable;
    return type(variable);
  } catch(e) {
    latest = e;
  }
  return false;
}

/**
 * 通用的类型执行方法
 * @param type: the type string of the var.
 * @returns {Function}
 * @private
 */
function _commonType(type) {
  return function(v) {
    var t = what(v);
    return t === type;
  }
}

function _instanceOf(o) {
  return function(v) {
    return v instanceof o;
  }
}

function _in(arr) {
  return function(v) {
    return arr.indexOf(v) >= 0;
  }
}

function _and(types) {
  return function(v) {
    var l = types.length;
    for(var i = 0; i < l; i ++) {
      // 必须都符合才行
      if (!_check(v, types[i])) return false;
    }
    return true;
  }
}

function _or(types) {
  return function(v) {
    var l = types.length;
    for(var i = 0; i < l; i ++) {
      // 只有有一个符合即可
      if (_check(v, types[i])) return true;
    }
    return false;
  }
}

function _not(type) {
  return function(v) {
    return !_check(v, type);
  }
}

function _arrayOf(t) {
  return function(v) {
    if (what(v) !== 'array') return false;

    var l = v.length;
    for(var i = 0; i < l; i ++) {
      if (!_check(v[i], t)) return false;
    }
    return true;
  }
}

function _shape(typeObj) {
  return function(v) {
    if (what(v) !== 'object') return false;

    for (var key in typeObj) {
      // if (typeObj.hasOwnProperty(key)) {
      if(!_check(v[key], typeObj[key])) return false;
      // }
    }
    return true;
  }
}

function _any() {
  return true;
}

function _apply(func) {
  return func;
}

/**
 * 扩展运算，可选的校验
 * @param type
 * @private
 */
function _optional(type) {
   return _or([
     type,
     _commonType('undefined')
   ]);
}

module.exports = {
  check: _check, // the unique API
  latest: function() { return latest; },
  undefined: _commonType('undefined'),
  null: _commonType('null'),
  bool: _commonType('boolean'),
  func: _commonType('function'),
  number: _commonType('number'),
  string: _commonType('string'),
  object: _commonType('object'),
  array: _commonType('array'),
  and: _and,
  or: _or,
  not: _not,
  any: _any,
  instanceOf: _instanceOf,
  in: _in,
  oneOf: _in, // cname of `in`, name from prop-types
  oneOfType: _or, // cname of `or`, name from prop-types
  arrayOf: _arrayOf,
  shape: _shape,
  apply: _apply,
  optional: _optional
};

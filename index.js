/**
 * Created by hustcc on 17/08/01.
 *
 * 👏 08-01 is my birthday on ID card.
 */


/**
 * Type class
 * @param type
 * @constructor
 */
function Type(type) {
  this.type = type;
}

/**
 * check whether the variable match the type.
 * How to use it? You can see the example in test.js
 *
 * @param variable
 * @returns {boolean}
 */
Type.prototype.check = function (variable) {
  try {
    return this.type(variable);
  } catch (_) {}
  return false;
};

/**
 * convent a type into optional.
 * 扩展运算，可选的校验
 * @returns Type
 */
Type.prototype.optional = function () {
  return _or([
    this,
    _simpleTypeOf('undefined')
  ]);
};


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

/**
 * 实例比较
 * @param o
 * @returns {Type}
 * @private
 */
function _instanceOf(o) {
  return new Type(function(v) {
    return v instanceof o;
  });
}

/**
 * 类型判断
 * @param s
 * @returns {Type}
 * @private
 */
function _typeOf(s) {
  return new Type(function(v) {
    return what(v) === s;
  });
}

/**
 * 简单类型的判断，用于性能优化
 * @param s
 * @returns {Type}
 * @private
 */
function _simpleTypeOf(s) {
  return new Type(function(v) {
    return typeof v === s;
  });
}

/**
 * 是否在数组中
 * @param arr
 * @returns {Type}
 * @private
 */
function _in(arr) {
  return new Type(function(v) {
    return arr.indexOf(v) >= 0;
  })
}

/**
 * 与逻辑
 * @param types
 * @returns {Type}
 * @private
 */
function _and(types) {
  return new Type(function(v) {
    var l = types.length;
    for (var i = 0; i < l; i ++) {
      // 必须都符合才行
      if (!types[i].check(v)) return false;
    }
    return true;
  });
}

/**
 * 或逻辑
 * @param types
 * @returns {Type}
 * @private
 */
function _or(types) {
  return new Type(function(v) {
    var l = types.length;
    for (var i = 0; i < l; i ++) {
      // 只有有一个符合即可
      if (types[i].check(v)) return true;
    }
    return false;
  })
}

/**
 * 非逻辑
 * @param type
 * @returns {Type}
 * @private
 */
function _not(type) {
  return new Type(function(v) {
    return !type.check(v);
  });
}

/**
 * array 元素内容
 * @param type
 * @returns {Type}
 * @private
 */
function _arrayOf(type) {
  return new Type(function(v) {
    // TODO v should be Array
    var l = v.length;
    if (l === undefined) return false;
    for (var i = 0; i < l; i ++) {
      if (!type.check(v[i])) return false;
    }
    return true;
  });
}

/**
 * object 结构
 * @param typeObj
 * @returns {Type}
 * @private
 */
function _shape(typeObj) {
  return new Type(function(v) {
    for (var key in typeObj) {
      // if (typeObj.hasOwnProperty(key)) {
      if(!typeObj[key].check(v[key])) return false;
      // }
    }
    return true;
  });
}

/**
 * apply 自定义
 * @param func
 * @returns {Type}
 * @private
 */
function _apply(func) {
  return new Type(func);
}

module.exports = {
  undefined: _simpleTypeOf('undefined'),
  bool: _simpleTypeOf('boolean'),
  func: _simpleTypeOf('function'),
  number: _simpleTypeOf('number'),
  string: _simpleTypeOf('string'),
  null: _typeOf('null'),
  object: _typeOf('object'),
  array: _typeOf('array'),
  and: _and,
  or: _or,
  not: _not,
  any: new Type(function() { return true; }),
  instanceOf: _instanceOf,
  typeOf: _typeOf,
  in: _in,
  oneOf: _in, // cname of `in`, name from prop-types
  oneOfType: _or, // cname of `or`, name from prop-types
  arrayOf: _arrayOf,
  shape: _shape,
  apply: _apply
};

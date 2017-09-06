/**
 * Created by hustcc on 17/08/01.
 *
 * 👏 08-01 is my birthday on ID card.
 */

;(function() {
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

  function _instanceOf(o) {
    return function(v) {
      return v instanceof o;
    }
  }

  function _typeOf(s) {
    return function(v) {
      return what(v) === s;
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
       _typeOf('undefined')
     ]);
  }

  var _VT = {
    check: _check, // the unique API
    latest: function() { return latest; },

    undefined: _typeOf('undefined'),
    null: _typeOf('null'),
    bool: _typeOf('boolean'),
    func: _typeOf('function'),
    number: _typeOf('number'),
    string: _typeOf('string'),
    object: _typeOf('object'),
    array: _typeOf('array'),
    and: _and,
    or: _or,
    not: _not,
    any: _any,
    instanceOf: _instanceOf,
    typeOf: _typeOf,
    in: _in,
    oneOf: _in, // cname of `in`, name from prop-types
    oneOfType: _or, // cname of `or`, name from prop-types
    arrayOf: _arrayOf,
    shape: _shape,
    apply: _apply,
    optional: _optional
  };

  // exports to the world.
  // commonjs
  if (typeof exports === 'object') {
    module.exports = _VT;
  }
  // AMD module
  else if (typeof define === 'function' && define.amd) {
    define('VT', function() {
      return _VT;
    });
  }
  // Browser global
  else {
    window.VT = _VT;
  }
})();

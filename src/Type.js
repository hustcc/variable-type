/**
 * Created by hustcc on 17/08/01.
 */

// var or = require('./or');
// var typeOf = require('./typeOf');

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
  var self = this;
  return new Type(function(v) {
    return v === undefined || self.check(v);
  });
};

module.exports = Type;

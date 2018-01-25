/**
 * Created by hustcc on 17/08/01.
 */

var Type = require('../Type');
var or = require('./or');
var typeOf = require('./typeOf');

/**
 * convent a type into optional.
 * 扩展运算，可选的校验
 * @param type
 * @returns Type
 */
module.exports = function(type) {
  return or([
    type,
    typeOf('undefined')
  ]);
};

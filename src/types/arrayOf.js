/**
 * Created by hustcc on 17/08/01.
 */

var Type = require('../Type');

/**
 * array 元素内容
 * @param type
 * @returns {Type}
 */
module.exports = function(type) {
  return new Type(function(v) {
    // TODO v should be Array
    var l = v.length;
    if (l === undefined) return false;
    for (var i = 0; i < l; i ++) {
      if (!type.check(v[i])) return false;
    }
    return true;
  });
};

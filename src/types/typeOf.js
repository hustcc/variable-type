/**
 * Created by hustcc on 17/08/01.
 */

var Type = require('../Type');
var what = require('../what');

/**
 * 类型判断
 * @param s
 * @returns {Type}
 */
module.exports = function(s) {
  return new Type(function(v) {
    return what(v) === s;
  });
};

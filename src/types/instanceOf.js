/**
 * Created by hustcc on 17/08/01.
 */

var Type = require('../Type');

/**
 * 实例比较
 * @param o
 * @returns {Type}
 */
module.exports = function(o) {
  return new Type(function(v) {
    return v instanceof o;
  });
};

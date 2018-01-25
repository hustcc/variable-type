/**
 * Created by hustcc on 17/08/01.
 */

var Type = require('../Type');

/**
 * 与逻辑
 * @param types
 * @returns {Type}
 */
module.exports = function(types) {
  return new Type(function(v) {
    var l = types.length;
    for (var i = 0; i < l; i ++) {
      // 必须都符合才行
      if (!types[i].check(v)) return false;
    }
    return true;
  });
};

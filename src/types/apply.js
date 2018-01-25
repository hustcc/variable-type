/**
 * Created by hustcc on 17/08/01.
 */

var Type = require('../Type');

/**
 * apply 自定义
 * @param func
 * @returns {Type}
 */
module.exports = function(func) {
  return new Type(func);
};

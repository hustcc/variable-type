/**
 * Created by xiaowei.wzw on 18/1/25.
 * Contract: xiaowei.wzw@antfin.com
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

module.exports = what;

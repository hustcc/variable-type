/**
 * Created by hustcc on 17/08/01.
 */

/**
 * what( v ) -> String : get what is the type of the input var.
 * @param v: the var which want to typeof
 * @returns {string}
 * https://github.com/hustcc/what.js
 */

export default function what(v: any) {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  const t = typeof v;
  // performance opt
  if (
    t === 'string' ||
    t === 'number' ||
    t === 'function' ||
    t === 'boolean'
  ) return t;

  return ({}).toString.call(v).slice(8, -1).toLowerCase();
}

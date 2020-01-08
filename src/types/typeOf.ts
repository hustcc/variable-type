/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';
import what from '../what';

/**
 * 类型判断
 * @param s
 * @returns {Type}
 */
export default function(s: any) {
  return new Type(function(v) {
    return what(v) === s;
  });
};

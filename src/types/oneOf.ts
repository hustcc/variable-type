/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';

/**
 * 是否在数组中
 * @param arr
 * @returns {Type}
 */
export default function(arr: any[]): Type {
  return new Type(v => arr.includes(v));
};

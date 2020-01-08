/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';

/**
 * array 元素内容
 * @param type
 * @returns {Type}
 */
export default function(type: Type): Type {
  return new Type(function(v: any[]) {
    if (!Array.isArray(v)) return false;
    const l = v.length;
    for (let i = 0; i < l; ++i)
      if (!type.check(v[i])) return false;
    return true;
  });
};

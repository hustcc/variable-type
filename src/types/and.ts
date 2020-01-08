/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';

/**
 * 与逻辑
 * @param types
 * @returns {Type}
 */
export default function(types: Type[]): Type {
  return new Type(function(v) {
    const l = types.length;
    for (let i = 0; i < l; ++i) {
      // 必须都符合才行
      if (!types[i].check(v)) return false;
    }
    return true;
  });
};

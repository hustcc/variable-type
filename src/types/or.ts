/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';

/**
 * 或逻辑
 * @param types
 * @returns {Type}
 */
export default function(types: Type[]): Type {
  return new Type(v => {
    const l = types.length;
    for (let i = 0; i < l; ++i) {
      // 只有有一个符合即可
      if (types[i].check(v)) return true;
    }
    return false;
  })
};

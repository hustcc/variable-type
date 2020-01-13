/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';

/**
 * 非逻辑
 * @param type
 * @returns {Type}
 */
export default function(type: Type): Type {
  return new Type(v => !type.check(v));
};

/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';
import or from './or';
import typeOf from './typeOf';

/**
 * convert a type into optional.
 * 扩展运算，可选的校验
 * @param type
 * @returns Type
 */
export default function(type: Type): Type {
  return or([
    type,
    typeOf('undefined')
  ]);
};

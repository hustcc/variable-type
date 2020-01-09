/**
 * Created by hustcc on 17/08/01.
 */

import Type, { TypeChecker } from '../Type';

/**
 * apply 自定义
 * @param func
 * @returns {Type}
 */
export default function(func: TypeChecker): Type {
  return new Type(func);
};

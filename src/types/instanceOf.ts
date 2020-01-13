/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';

/**
 * 实例比较
 * @param o
 * @returns {Type}
 */
export default function(o: any): Type {
  return new Type(v => v instanceof o);
};

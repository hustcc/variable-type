/**
 * Created by hustcc on 17/08/01.
 */

import Type from '../Type';

/**
 * object 结构
 * @param typeObj
 * @returns {Type}
 */

export default function(typeObj: Record<string, Type>): Type {
  return new Type(v => {
    for (const key in typeObj)
      if(!typeObj[key].check(v[key]))
        return false;
    return true;
  });
};

/**
 * Created by hustcc on 17/08/01.
 */

import _optional from './types/optional';

export type TypeChecker = (t: any) => boolean;

export default class Type {
  type: TypeChecker;

  constructor(type: TypeChecker){
    this.type = type;
  }

  check: TypeChecker = (variable: any): boolean => {
    try {
      return this.type(variable);
    } catch {}
    return false;
  };

  optional: () => Type = (): Type => {
    return _optional(this);
  };
}

/**
 * Created by hustcc on 17/08/01.
 */

import optionalChecker from './types/optional';

export type TypeChecker = (t: any) => boolean;

export default class Type {
  readonly type: TypeChecker;

  constructor(type: TypeChecker){
    this.type = type;
  }

  readonly check: TypeChecker = (variable: any): boolean => {
    try {
      return this.type(variable);
    } catch {}
    return false;
  };

  readonly optional: () => Type = (): Type => {
    return optionalChecker(this);
  };
}

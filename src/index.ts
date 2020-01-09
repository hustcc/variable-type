/**
 * Created by hustcc on 17/08/01.
 *
 * 👏 08-01 is my birthday on ID card.
 */

import Type, {TypeChecker} from './Type';

import and from './types/and';
import apply from './types/apply';
import arrayOf from './types/arrayOf';
import oneOf from './types/oneOf';
import instanceOf from './types/instanceOf';
import not from './types/not';
import or from './types/or';
import shape from './types/shape';
import typeOf from './types/typeOf';

type TypeTransformer = (type: Type) => Type;
type TypeCombiner = (types: Type[]) => Type;
type TypeGenerator = (toCheck: any) => Type;
type EnumValidator = (toCheck: any[]) => Type;

export type VariableType = {
    undefined: Type;
    bool: Type;
    func: Type;
    number: Type;
    string: Type;
    null: Type;
    object: Type;
    array: Type;
    any: Type,
    and: TypeCombiner;
    or: TypeCombiner;
    not: TypeTransformer;
    instanceOf: TypeGenerator;
    typeOf: TypeGenerator;
    in: EnumValidator;
    oneOf: EnumValidator;
    oneOfType: TypeCombiner;
    arrayOf: TypeTransformer;
    shape: (typeShape: Record<string, Type>) => Type;
    apply: (func: TypeChecker) => Type;
};

const VT: VariableType = {
    undefined: typeOf('undefined'),
    bool: typeOf('boolean'), // simple
    func: typeOf('function'), // simple
    number: typeOf('number'), // simple
    string: typeOf('string'), // simple
    null: typeOf('null'),
    object: typeOf('object'),
    array: typeOf('array'),
    and,
    or,
    not,
    any: new Type(() => true),
    instanceOf,
    typeOf,
    in: oneOf,
    oneOf, // cname of `in`, name from prop-types
    oneOfType: or, // cname of `or`, name from prop-types
    arrayOf,
    shape,
    apply
};

export default VT;

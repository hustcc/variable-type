/**
 * Created by hustcc on 17/08/01.
 *
 * 👏 08-01 is my birthday on ID card.
 */

import Type from './Type';

import and from './types/and';
import apply from './types/apply';
import arrayOf from './types/arrayOf';
import oneOf from './types/oneOf';
import instanceOf from './types/instanceOf';
import not from './types/not';
import or from './types/or';
import shape from './types/shape';
import typeOf from './types/typeOf';

type FunctionThatReturnsType = (toCheck: any) => Type;

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
    and: FunctionThatReturnsType;
    or: FunctionThatReturnsType;
    not: FunctionThatReturnsType;
    instanceOf: FunctionThatReturnsType;
    typeOf: FunctionThatReturnsType;
    in: FunctionThatReturnsType;
    oneOf: FunctionThatReturnsType;
    oneOfType: FunctionThatReturnsType;
    arrayOf: FunctionThatReturnsType;
    shape: FunctionThatReturnsType;
    apply: FunctionThatReturnsType;
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

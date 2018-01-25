/**
 * Created by hustcc on 17/08/01.
 *
 * 👏 08-01 is my birthday on ID card.
 */

var Type = require('./Type');

var and = require('./types/and');
var apply = require('./types/apply');
var arrayOf = require('./types/arrayOf');
var oneOf = require('./types/oneOf');
var instanceOf = require('./types/instanceOf');
var not = require('./types/not');
var or = require('./types/or');
var shape = require('./types/shape');
var typeOf = require('./types/typeOf');


module.exports = {
  undefined: typeOf('undefined'),
  bool: typeOf('boolean'), // simple
  func: typeOf('function'), // simple
  number: typeOf('number'), // simple
  string: typeOf('string'), // simple
  null: typeOf('null'),
  object: typeOf('object'),
  array: typeOf('array'),
  and: and,
  or: or,
  not: not,
  any: new Type(function() { return true; }),
  instanceOf: instanceOf,
  typeOf: typeOf,
  in: oneOf,
  oneOf: oneOf, // cname of `in`, name from prop-types
  oneOfType: or, // cname of `or`, name from prop-types
  arrayOf: arrayOf,
  shape: shape,
  apply: apply
};

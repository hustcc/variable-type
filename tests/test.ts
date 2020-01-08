import VT from '../src/index';
import Type from '../src/Type';

describe('variable-type', () => {
  test('bool', () => {
    expect(VT.bool.check(true)).toEqual(true);
    expect(VT.bool.check(false)).toEqual(true);
    expect(VT.bool.check(undefined)).toEqual(false);
    expect(VT.bool.check('1')).toEqual(false);
    expect(VT.bool.check(null)).toEqual(false);
  });

  test('func', () => {
    expect(VT.func.check(Math.pow)).toEqual(true);
    expect(VT.func.check(function _test() {})).toEqual(true);
    expect(VT.func.check(undefined)).toEqual(false);
    expect(VT.func.check(1.2)).toEqual(false);
    expect(VT.func.check('1')).toEqual(false);
    expect(VT.func.check(null)).toEqual(false);
  });

  test('number', () => {
    expect(VT.number.check(1)).toEqual(true);
    expect(VT.number.check(1.2)).toEqual(true);
    expect(VT.number.check(undefined)).toEqual(false);
    expect(VT.number.check('1')).toEqual(false);
    expect(VT.number.check(null)).toEqual(false);
  });

  test('string', () => {
    expect(VT.string.check('1')).toEqual(true);
    expect(VT.string.check('variable-type')).toEqual(true);
    expect(VT.string.check(undefined)).toEqual(false);
    expect(VT.string.check(1)).toEqual(false);
    expect(VT.string.check(null)).toEqual(false);
  });

  test('instanceOf', () => {
    expect(VT.instanceOf(Date).check(new Date())).toEqual(true);
    expect(VT.instanceOf(Date).check(undefined)).toEqual(false);
    expect(VT.instanceOf(Date).check('1')).toEqual(false);
    expect(VT.instanceOf(Date).check(null)).toEqual(false);
  });

  test('typeOf', () => {
    expect(VT.typeOf('date').check(new Date())).toEqual(true);
    expect(VT.typeOf('number').check(1)).toEqual(true);
    expect(VT.typeOf('string').check('hustcc')).toEqual(true);
    expect(VT.typeOf('test').check('hustcc')).toEqual(false);
  });


  test('object', () => {
    expect(VT.object.check({})).toEqual(true);
    expect(VT.object.check(undefined)).toEqual(false);
    expect(VT.object.check('1')).toEqual(false);
    expect(VT.object.check(null)).toEqual(false);
  });

  test('array', () => {
    expect(VT.array.check([])).toEqual(true);
    expect(VT.array.check(undefined)).toEqual(false);
    expect(VT.array.check('1')).toEqual(false);
    expect(VT.array.check(null)).toEqual(false);
  });

  test('undefined', () => {
    expect(VT.undefined.check(undefined)).toEqual(true);
    expect(VT.undefined.check(null)).toEqual(false);
    expect(VT.undefined.check(1)).toEqual(false);
    expect(VT.undefined.check('hustcc')).toEqual(false);
  });

  test('null', () => {
    expect(VT.null.check(undefined)).toEqual(false);
    expect(VT.null.check(null)).toEqual(true);
    expect(VT.null.check(1)).toEqual(false);
    expect(VT.null.check('hustcc')).toEqual(false);
  });

  test('oneOf', () => {
    expect(VT.oneOf(['a', 1]).check('a')).toEqual(true);
    expect(VT.oneOf(['a', 1]).check(1)).toEqual(true);
    expect(VT.oneOf(['a', 1]).check('1')).toEqual(false);
    expect(VT.oneOf(['a', 1]).check(undefined)).toEqual(false);
    expect(VT.oneOf(['a', 1]).check(new Date())).toEqual(false);

    // except cases
    expect(VT.oneOf(['a', 1]).check(null)).toEqual(false);
    expect(VT.oneOf(['a', 1]).check(undefined)).toEqual(false);
    expect(VT.oneOf(['a', 1]).check(new Date())).toEqual(false);
  });

  test('in', () => {
    expect(VT.in(['a', 1]).check('a')).toEqual(true);
    expect(VT.in(['a', 1]).check(1)).toEqual(true);
    expect(VT.in(['a', 1]).check('1')).toEqual(false);
    expect(VT.in(['a', 1]).check(undefined)).toEqual(false);
    expect(VT.in(['a', 1]).check(new Date())).toEqual(false);

    // except cases
    expect(VT.in(['a', 1]).check(null)).toEqual(false);
    expect(VT.in(['a', 1]).check(undefined)).toEqual(false);
    expect(VT.in(['a', 1]).check(new Date())).toEqual(false);
  });

  test('any', () => {
    expect(VT.any.check('a')).toEqual(true);
    expect(VT.any.check(1)).toEqual(true);
    expect(VT.any.check(undefined)).toEqual(true);
    expect(VT.any.check(new Date())).toEqual(true);
  });

  test('oneOfType', () => {
    expect(VT.oneOfType([
      VT.number
    ]).check('a')).toEqual(false);

    expect(VT.oneOfType([
      VT.number,
      VT.string
    ]).check('a')).toEqual(true);

    expect(VT.oneOfType([
      VT.number,
      VT.string,
      VT.instanceOf(Date)
    ]).check(new Date())).toEqual(true);

    // except cases
    expect(VT.oneOfType([
      VT.number
    ]).check(null)).toEqual(false);

    expect(VT.oneOfType([
      VT.number
    ]).check(undefined)).toEqual(false);

    expect(VT.oneOfType([
      VT.number
    ]).check(new Date())).toEqual(false);
  });

  test('or', () => {
    expect(VT.or([
      VT.number
    ]).check('a')).toEqual(false);

    expect(VT.or([
      VT.number,
      VT.string
    ]).check('a')).toEqual(true);

    expect(VT.or([
      VT.number,
      VT.string,
      VT.instanceOf(Date)
    ]).check(new Date())).toEqual(true);

    // except cases
    expect(VT.or([
      VT.number
    ]).check(null)).toEqual(false);

    expect(VT.or([
      VT.number
    ]).check(undefined)).toEqual(false);

    expect(VT.or([
      VT.number
    ]).check(new Date())).toEqual(false);
  });

  test('and', () => {
    expect(VT.and([
      VT.number
    ]).check('a')).toEqual(false);

    expect(VT.and([
      VT.string
    ]).check('a')).toEqual(true);

    expect(VT.and([
      VT.string,
      VT.in(['a', 'b'])
    ]).check('a')).toEqual(true);

    // except cases
    expect(VT.and([
      VT.number
    ]).check(null)).toEqual(false);

    expect(VT.and([
      VT.number
    ]).check(undefined)).toEqual(false);

    expect(VT.and([
      VT.number
    ]).check(new Date())).toEqual(false);
  });

  test('not', () => {
    expect(VT.not(VT.and([
      VT.number
    ])).check('a')).toEqual(true);

    expect(VT.not(VT.and([
      VT.string
    ])).check('a')).toEqual(false);

    expect(VT.not(VT.and([
      VT.string,
      VT.in(['a', 'b'])
    ])).check('a')).toEqual(false);

    // except cases
    expect(VT.not(VT.and([
      VT.number
    ])).check(null)).toEqual(true);

    expect(VT.not(VT.and([
      VT.number
    ])).check(undefined)).toEqual(true);

    expect(VT.not(VT.and([
      VT.number
    ])).check(undefined)).toEqual(true);

    expect(VT.not(VT.number).check(new Date())).toEqual(true);
  });

  test('apply', () => {
    expect(VT.apply((v: any) => {
      return v.indexOf('hustcc') !== -1;
    }).check('hustcc')).toEqual(true);

    expect(VT.shape({
      name: VT.apply((v: any) => {
        return v[0] === 'H';
      })
    }).check({
      name: 'Hello'
    })).toEqual(true);

    expect(VT.arrayOf(
      VT.apply((v: any) => {
        return v < 4;
      })
    ).check([1, 2, 3])).toEqual(true);

    expect(VT.arrayOf(
      VT.apply((v: any) => {
        return v > 2;
      })
    ).check([1, 2, 3])).toEqual(false);
  });

  test('arrayOf', () => {
    expect(VT.arrayOf(VT.number).check([1, 2, 3])).toEqual(true);
    expect(VT.arrayOf(VT.string).check(['1', '2'])).toEqual(true);
    expect(VT.arrayOf(VT.instanceOf(Date)).check([new Date()])).toEqual(true);
    expect(VT.arrayOf(VT.string).check(['1', 2])).toEqual(false);
    expect(VT.arrayOf(VT.func).check(['1', 2])).toEqual(false);


    expect(VT.arrayOf(
      VT.arrayOf(
        VT.or([
          VT.number,
          VT.string
        ])
      )
    ).check([
      ['1', 2, '3'],
      ['1', 2, '3']
    ])).toEqual(true);

    // except cases
    expect(VT.arrayOf(VT.func).check(null)).toEqual(false);
    expect(VT.arrayOf(VT.func).check(undefined)).toEqual(false);
    expect(VT.arrayOf(VT.func).check(1)).toEqual(false);
    expect(VT.arrayOf(VT.func).check('hello')).toEqual(false);
    expect(VT.arrayOf(VT.func).check(new Date())).toEqual(false);
  });

  test('shape', () => {
    expect(VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date),
      f: VT.in([1, '1'])
    }).check({
      a: true,
      b: 1,
      c: 'str',
      d: () => {},
      e: new Date(),
      f: '1'
    })).toEqual(true);

    expect(VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date)
    }).check({
      a: true,
      c: 'str',
      e: new Date()
    })).toEqual(false);

    expect(VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date)
    }).check({
      a: true,
      c: 123,
      e: new Date()
    })).toEqual(false);

    expect(VT.shape({
      name: VT.string,
      boy: VT.bool,
      birthday: VT.instanceOf(Date)
    }).check({
      name: 'hustcc',
      boy: true,
      birthday: new Date(1992, 8, 1)
    })).toEqual(true);

    // except case
    expect(VT.shape({
      name: VT.string
    }).check(null)).toEqual(false);

    expect(VT.shape({
      name: VT.string
    }).check(undefined)).toEqual(false);

    expect(VT.shape({
      name: VT.string
    }).check(new Date())).toEqual(false);
  });

  test('recursive', () => {
    type RecursiveType = {
      name: Type;
      children?: Type;
    };
    const types: RecursiveType = {
      name: VT.string
    };
    types.children = VT.or([
      VT.arrayOf(VT.shape(types)),
      VT.undefined
    ]);
    const recursiveTypes = VT.shape(types);

    expect(recursiveTypes.check({
      name: 'Life',
      children: [{
        name: 'Animal',
        children: [{
          name: 'Dog',
          children: [{
            name: 'Dog1'
          }, {
            name: 'Dog2'
          }]
        }, {
          name: 'Cat'
        }
        ]}, {
        name: 'Plant'
      }]
    })).toEqual(true);

    expect(recursiveTypes.check({
      name: 'Life',
      children: [{
        name: 'Animal',
        children: [{
          name: 'Dog',
          children: [{
            name: 888
          }, {
            name: 'Dog2'
          }]
        }, {
          name: 'Cat'
        }
        ]}, {
        name: 'Plant'
      }]
    })).toEqual(false);
  });

  test('complex usage', () => {
    expect(VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date),
      f: VT.in([1, '1']),
      g: VT.shape({
        h: VT.oneOfType([
          VT.shape({
            i: VT.arrayOf(
              VT.oneOfType([
                VT.number,
                VT.string,
                VT.bool,
                VT.shape({
                  j: VT.func,
                  k: VT.null,
                  l: VT.undefined
                })
              ])
            )
          })
        ])
      })
    }).check({
      a: true,
      b: 1,
      c: 'str',
      d: () => {},
      e: new Date(),
      f: '1',
      g: {
        h: {
          i: [
            '1',
            2,
            true,
            {
              j: () => {},
              k: null
            }
          ]
        }
      }
    })).toEqual(true);

    expect(VT.shape({
      a: VT.bool,
      b: VT.number,
      c: VT.string,
      d: VT.func,
      e: VT.instanceOf(Date),
      f: VT.in([1, '1']),
      g: VT.shape({
        h: VT.oneOfType([
          VT.shape({
            i: VT.arrayOf(
              VT.oneOfType([
                VT.number,
                VT.string,
                VT.bool,
                VT.shape({
                  j: VT.func
                })
              ])
            )
          })
        ])
      })
    }).check({
      a: true,
      b: 1,
      c: 'str',
      d: () => {},
      e: new Date(),
      f: '1',
      g: {
        h: {
          i: [
            '1',
            2,
            true,
            {
              j: 1
            }
          ]
        }
      }
    })).toEqual(false);
  });

  test('optional()', () => {
    expect(VT.string.optional().check('hustcc')).toEqual(true);
    expect(VT.string.optional().check(undefined)).toEqual(true);

    expect(VT.shape({
      name: VT.string,
      birthday: VT.string,
      sex: VT.string.optional()
    }).check({
      name: 'hustcc',
      birthday: '1992-08-01'
    })).toEqual(true);

    expect(VT.shape({
      name: VT.string,
      birthday: VT.string,
      sex: VT.string.optional()
    }).check({
      name: 'hustcc',
      birthday: '1992-08-01',
      sex: '1'
    })).toEqual(true);

    expect(VT.shape({
      name: VT.string,
      birthday: VT.string,
      sex: VT.string.optional()
    }).check({
      name: 'hustcc',
      birthday: '1992-08-01',
      sex: 0
    })).toEqual(false);
  });

  test('single usage', () => {
    expect(VT.bool.check(true)).toEqual(true);
    expect(VT.func.check(Math.pow)).toEqual(true);
    expect(VT.number.check(123)).toEqual(true);
    expect(VT.string.check('hustcc')).toEqual(true);
    expect(VT.object.check({a: 1})).toEqual(true);
    expect(VT.array.check([1, 2, '3'])).toEqual(true);
    expect(VT.any.check(true)).toEqual(true);
    expect(VT.null.check(null)).toEqual(true);
    expect(VT.undefined.check(undefined)).toEqual(true);
  });
});

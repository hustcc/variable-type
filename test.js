var VT = require('./');
var expect = require('expect');

describe('variable-type', function() {
  it(' - bool', function() {
    expect(VT.bool.check(true)).toBe(true);
    expect(VT.bool.check(false)).toBe(true);
    expect(VT.bool.check(undefined)).toBe(false);
    expect(VT.bool.check('1')).toBe(false);
    expect(VT.bool.check(null)).toBe(false);
  });

  it(' - func', function() {
    expect(VT.func.check(Math.pow)).toBe(true);
    expect(VT.func.check(function _test() {})).toBe(true);
    expect(VT.func.check(undefined)).toBe(false);
    expect(VT.func.check(1.2)).toBe(false);
    expect(VT.func.check('1')).toBe(false);
    expect(VT.func.check(null)).toBe(false);
  });

  it(' - number', function() {
    expect(VT.number.check(1)).toBe(true);
    expect(VT.number.check(1.2)).toBe(true);
    expect(VT.number.check(undefined)).toBe(false);
    expect(VT.number.check('1')).toBe(false);
    expect(VT.number.check(null)).toBe(false);
  });

  it(' - string', function() {
    expect(VT.string.check('1')).toBe(true);
    expect(VT.string.check('variable-type')).toBe(true);
    expect(VT.string.check(undefined)).toBe(false);
    expect(VT.string.check(1)).toBe(false);
    expect(VT.string.check(null)).toBe(false);
  });

  it(' - instanceOf', function() {
    expect(VT.instanceOf(Date).check(new Date())).toBe(true);
    expect(VT.instanceOf(Date).check(undefined)).toBe(false);
    expect(VT.instanceOf(Date).check('1')).toBe(false);
    expect(VT.instanceOf(Date).check(null)).toBe(false);
  });

  it(' - typeOf', function() {
    expect(VT.typeOf('date').check(new Date())).toBe(true);
    expect(VT.typeOf('number').check(1)).toBe(true);
    expect(VT.typeOf('string').check('hustcc')).toBe(true);
    expect(VT.typeOf('test').check('hustcc')).toBe(false);
  });


  it(' - object', function() {
    expect(VT.object.check({})).toBe(true);
    expect(VT.object.check(undefined)).toBe(false);
    expect(VT.object.check('1')).toBe(false);
    expect(VT.object.check(null)).toBe(false);
  });

  it(' - array', function() {
    expect(VT.array.check([])).toBe(true);
    expect(VT.array.check(undefined)).toBe(false);
    expect(VT.array.check('1')).toBe(false);
    expect(VT.array.check(null)).toBe(false);
  });

  it(' - undefined', function() {
    expect(VT.undefined.check(undefined)).toBe(true);
    expect(VT.undefined.check(null)).toBe(false);
    expect(VT.undefined.check(1)).toBe(false);
    expect(VT.undefined.check('hustcc')).toBe(false);
  });

  it(' - null', function() {
    expect(VT.null.check(undefined)).toBe(false);
    expect(VT.null.check(null)).toBe(true);
    expect(VT.null.check(1)).toBe(false);
    expect(VT.null.check('hustcc')).toBe(false);
  });

  it(' - oneOf', function() {
    expect(VT.oneOf(['a', 1]).check('a')).toBe(true);
    expect(VT.oneOf(['a', 1]).check(1)).toBe(true);
    expect(VT.oneOf(['a', 1]).check('1')).toBe(false);
    expect(VT.oneOf(['a', 1]).check(undefined)).toBe(false);
    expect(VT.oneOf(['a', 1]).check(new Date())).toBe(false);

    // except cases
    expect(VT.oneOf(['a', 1]).check(null)).toBe(false);
    expect(VT.oneOf(['a', 1]).check(undefined)).toBe(false);
    expect(VT.oneOf(['a', 1]).check(new Date())).toBe(false);
  });

  it(' - in', function() {
    expect(VT.in(['a', 1]).check('a')).toBe(true);
    expect(VT.in(['a', 1]).check(1)).toBe(true);
    expect(VT.in(['a', 1]).check('1')).toBe(false);
    expect(VT.in(['a', 1]).check(undefined)).toBe(false);
    expect(VT.in(['a', 1]).check(new Date())).toBe(false);

    // except cases
    expect(VT.in(['a', 1]).check(null)).toBe(false);
    expect(VT.in(['a', 1]).check(undefined)).toBe(false);
    expect(VT.in(['a', 1]).check(new Date())).toBe(false);
  });

  it(' - any', function() {
    expect(VT.any.check('a')).toBe(true);
    expect(VT.any.check(1)).toBe(true);
    expect(VT.any.check(undefined)).toBe(true);
    expect(VT.any.check(new Date())).toBe(true);
  });

  it(' - oneOfType', function() {
    expect(VT.oneOfType([
      VT.number
    ]).check('a')).toBe(false);

    expect(VT.oneOfType([
      VT.number,
      VT.string
    ]).check('a')).toBe(true);

    expect(VT.oneOfType([
      VT.number,
      VT.string,
      VT.instanceOf(Date)
    ]).check(new Date())).toBe(true);

    // except cases
    expect(VT.oneOfType([
      VT.number
    ]).check(null)).toBe(false);

    expect(VT.oneOfType([
      VT.number
    ]).check(undefined)).toBe(false);

    expect(VT.oneOfType([
      VT.number
    ]).check(new Date())).toBe(false);
  });

  it(' - or', function() {
    expect(VT.or([
      VT.number
    ]).check('a')).toBe(false);

    expect(VT.or([
      VT.number,
      VT.string
    ]).check('a')).toBe(true);

    expect(VT.or([
      VT.number,
      VT.string,
      VT.instanceOf(Date)
    ]).check(new Date())).toBe(true);

    // except cases
    expect(VT.or([
      VT.number
    ]).check(null)).toBe(false);

    expect(VT.or([
      VT.number
    ]).check(undefined)).toBe(false);

    expect(VT.or([
      VT.number
    ]).check(new Date())).toBe(false);
  });

  it(' - and', function() {
    expect(VT.and([
      VT.number
    ]).check('a')).toBe(false);

    expect(VT.and([
      VT.string
    ]).check('a')).toBe(true);

    expect(VT.and([
      VT.string,
      VT.in(['a', 'b'])
    ]).check('a')).toBe(true);

    // except cases
    expect(VT.and([
      VT.number
    ]).check(null)).toBe(false);

    expect(VT.and([
      VT.number
    ]).check(undefined)).toBe(false);

    expect(VT.and([
      VT.number
    ]).check(new Date())).toBe(false);
  });

  it(' - not', function() {
    expect(VT.not(VT.and([
      VT.number
    ])).check('a')).toBe(true);

    expect(VT.not(VT.and([
      VT.string
    ])).check('a')).toBe(false);

    expect(VT.not(VT.and([
      VT.string,
      VT.in(['a', 'b'])
    ])).check('a')).toBe(false);

    // except cases
    expect(VT.not(VT.and([
      VT.number
    ])).check(null)).toBe(true);

    expect(VT.not(VT.and([
      VT.number
    ])).check(undefined)).toBe(true);

    expect(VT.not(VT.and([
      VT.number
    ])).check(undefined)).toBe(true);

    expect(VT.not(VT.number).check(new Date())).toBe(true);
  });

  it(' - apply', function() {
    expect(VT.apply(function (v) {
      return v.indexOf('hustcc') !== -1;
    }).check('hustcc')).toBe(true);

    expect(VT.shape({
      name: VT.apply(function (v) {
        return v[0] === 'H';
      })
    }).check({
      name: 'Hello'
    })).toBe(true);

    expect(VT.arrayOf(
      VT.apply(function (v) {
        return v < 4;
      })
    ).check([1, 2, 3])).toBe(true);

    expect(VT.arrayOf(
      VT.apply(function (v) {
        return v > 2;
      })
    ).check([1, 2, 3])).toBe(false);
  });

  it(' - arrayOf', function() {
    expect(VT.arrayOf(VT.number).check([1, 2, 3])).toBe(true);
    expect(VT.arrayOf(VT.string).check(['1', '2'])).toBe(true);
    expect(VT.arrayOf(VT.instanceOf(Date)).check([new Date()])).toBe(true);
    expect(VT.arrayOf(VT.string).check(['1', 2])).toBe(false);
    expect(VT.arrayOf(VT.func).check(['1', 2])).toBe(false);


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
    ])).toBe(true);

    // except cases
    expect(VT.arrayOf(VT.func).check(null)).toBe(false);
    expect(VT.arrayOf(VT.func).check(undefined)).toBe(false);
    expect(VT.arrayOf(VT.func).check(1)).toBe(false);
    expect(VT.arrayOf(VT.func).check('hello')).toBe(false);
    expect(VT.arrayOf(VT.func).check(new Date())).toBe(false);
  });

  it(' - shape', function() {
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
      d: function() {},
      e: new Date(),
      f: '1'
    })).toBe(true);

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
    })).toBe(false);

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
    })).toBe(false);

    expect(VT.shape({
      name: VT.string,
      boy: VT.bool,
      birthday: VT.instanceOf(Date)
    }).check({
      name: 'hustcc',
      boy: true,
      birthday: new Date(1992, 8, 1)
    })).toBe(true);

    // except case
    expect(VT.shape({
      name: VT.string
    }).check(null)).toBe(false);

    expect(VT.shape({
      name: VT.string
    }).check(undefined)).toBe(false);

    expect(VT.shape({
      name: VT.string
    }).check(new Date())).toBe(false);
  });

  it(' - recursive', function() {
    var types = {
      name: VT.string
    };
    types.children = VT.or([
      VT.arrayOf(VT.shape(types)),
      VT.undefined
    ]);
    var recursiveTypes = VT.shape(types);

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
    })).toBe(true);

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
    })).toBe(false);
  });

  it(' - complex usage', function() {
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
      d: function() {},
      e: new Date(),
      f: '1',
      g: {
        h: {
          i: [
            '1',
            2,
            true,
            {
              j: function() {},
              k: null
            }
          ]
        }
      }
    })).toBe(true);

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
      d: function() {},
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
    })).toBe(false);
  });

  it(' - optional()', function() {
    expect(VT.string.optional().check('hustcc')).toBe(true);
    expect(VT.string.optional().check(undefined)).toBe(true);

    expect(VT.shape({
      name: VT.string,
      birthday: VT.string,
      sex: VT.string.optional()
    }).check({
      name: 'hustcc',
      birthday: '1992-08-01'
    })).toBe(true);

    expect(VT.shape({
      name: VT.string,
      birthday: VT.string,
      sex: VT.string.optional()
    }).check({
      name: 'hustcc',
      birthday: '1992-08-01',
      sex: '1'
    })).toBe(true);

    expect(VT.shape({
      name: VT.string,
      birthday: VT.string,
      sex: VT.string.optional()
    }).check({
      name: 'hustcc',
      birthday: '1992-08-01',
      sex: 0
    })).toBe(false);
  });

  // it(' - latest()', function() {
  //   expect((1, VT.in(['a', 1]))).toBe(true);
  //   expect(VT.latest()).toEqual(1);
  //   expect(('1', VT.in(['a', 1]))).toBe(false);
  //   expect(VT.latest()).toEqual('1');
  //   expect((undefined, VT.in(['a', 1]))).toBe(false);
  //   expect(VT.latest()).toEqual(undefined);
  //   expect((new Date(2017, 8, 1), VT.in(['a', 1]))).toBe(false);
  //   expect(VT.latest()).toEqual(new Date(2017, 8, 1));
  //
  //   expect(({ a: '1' }, VT.in(['a', 1]))).toBe(false);
  //   expect(VT.latest()).toEqual({ a: '1' });
  // });

  it(' - single usage', function() {
    expect(VT.bool.check(true)).toBe(true);
    expect(VT.func.check(Math.pow)).toBe(true);
    expect(VT.number.check(123)).toBe(true);
    expect(VT.string.check('hustcc')).toBe(true);
    expect(VT.object.check({a: 1})).toBe(true);
    expect(VT.array.check([1, 2, '3'])).toBe(true);
    expect(VT.any.check(true)).toBe(true);
    expect(VT.null.check(null)).toBe(true);
    expect(VT.undefined.check(undefined)).toBe(true);
  });
});
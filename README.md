# variable-type

> A high-performance javascript(`less then 1 kb`) library, runtime **type checking** for variable and similar objects.
> 
> 一个非常简单的（仅 1 kb）高性能的用于做变量结构校验的 JavaScript 模块。
> 
> Inspired by [prop-types](https://github.com/facebook/prop-types), but **2.5x** faster then it.

[![Ver](https://img.shields.io/npm/v/variable-type.svg)](https://www.npmjs.com/package/variable-type) [![Build Status](https://travis-ci.org/hustcc/variable-type.svg?branch=master)](https://travis-ci.org/hustcc/variable-type) [![Coverage Status](https://coveralls.io/repos/github/hustcc/variable-type/badge.svg?branch=master)](https://coveralls.io/github/hustcc/variable-type) [![npm download](https://img.shields.io/npm/dm/variable-type.svg)](https://www.npmjs.com/package/variable-type)


## 1. Install

> **npm i --save variable-type**

Then import it.

```js
import VT from 'variable-type'; // ES6
var VT = require('variable-type'); // ES5 with npm
```


## 2. API & Types

There are only 2 API:
 - `VT.check(variable, type)`. Check whether the variable can match the type.
 - `VT.latest()`. Get the latest check variable / error when false.
 
 And the library contains `Types` below:

 - **VT.bool**
 - **VT.func**
 - **VT.number**
 - **VT.string**
 - **VT.object**
 - **VT.array**
 - **VT.any**
 - **VT.null**
 - **VT.undefined**
 - **VT.instanceOf(Class)**
 - **VT.in(Array)**
 - **VT.arrayOf(Type)**
 - **VT.shape(TypeObject)**
 - **VT.and(TypeArray)**
 - **VT.or(TypeArray)**
 - **VT.not(Type)**
 - **VT.apply(Function)**
 - **VT.optional(Type)**: match the Type or VT.undefined.

You can see all the usage in the [test cases file](test.js).

If more Types are needed, welcome to `send a pull request`, or put an issue to me.


## 3. Usage examples

Here is some examples. More you can see in [test.js](test.js) file.

 - Simple usage

```js
VT.check(1992, VT.number);
VT.check('hustcc', VT.string);
VT.check(Math.min, VT.func);
VT.check(true, VT.bool);
VT.check({}, VT.object);
VT.check([1, 2, 3], VT.array);
VT.check(null, VT.null);
VT.check(undefined, VT.undefined);
VT.check(new Date(), VT.instanceOf(Date));
VT.check('hustcc', VT.in(['hustcc', 'hust', 'cc']));
```

 - And / Or / Not

 ```js
VT.check('hustcc', VT.not(VT.in(['hustcc', 'cc'])));
VT.check('hustcc', VT.and([
	VT.string
	VT.in(['hustcc', 1992]),
]));
VT.check('hustcc', VT.or([
	VT.number,
	VT.string,
]));
 ```

 - `Array` type.

```js
var arr = ['hello', 'world', 25, new Date(1992, 8, 1)];
 
var types = VT.arrayOf(
  VT.or([
    VT.number,
    VT.string,
    VT.instanceOf(Date)
  ])
);

VT.check(arr, types); // will get true. 
```

 - `Object` type.

```js
var obj = {
  name: 'hustcc',
  boy: true,
  birthday: new Date(1992, 8, 1)
};
 
var types = VT.shape({
  name: VT.string,
  boy: VT.bool,
  birthday: VT.instanceOf(Date)
});

VT.check(obj, types); // will get true. 
```

 - `Complex` example.

```js

// The only API `check`.
VT.check({
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
          j: function() {}
        }
      ]
    }
  }
}, VT.shape({
  a: VT.bool,
  b: VT.number,
  c: VT.string,
  d: VT.func,
  e: VT.instanceOf(Date),
  f: VT.in([1, '1']),
  g: VT.shape({
    h: VT.or([
      VT.shape({
        i: VT.arrayOf(
          VT.or([
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
}); // Then will get true.
```

 - Optional type

```js
VT.check({
  name: 'hustcc',
  birthday: '1992-08-01'
}, VT.shape({
  name: VT.string,
  birthday: VT.string,
  sex: VT.optional(VT.string)
}); // Then will get true.
```


## 4. Test & Perf

```
npm i

npm run test

npm run perf
```

> [OPS] variable-type / prop-types = 2.495


## License

ISC@[hustcc](https://github.com/hustcc).



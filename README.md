# variable-type

> A simple javascript(`less then 1 kb`) library, runtime **type checking** for variable and similar objects. 
> 一个非常简单（仅 1 kb）的用于做变量结构校验的 JavaScript 模块。
> 
> Simplified from [prop-types](https://github.com/facebook/prop-types).

[![Ver](https://img.shields.io/npm/v/variable-type.svg)](https://www.npmjs.com/package/variable-type) [![Build Status](https://travis-ci.org/hustcc/variable-type.svg?branch=master)](https://travis-ci.org/hustcc/variable-type) [![Coverage Status](https://coveralls.io/repos/github/hustcc/variable-type/badge.svg)](https://coveralls.io/github/hustcc/variable-type)


## 1. Install

> **npm i --save variable-type**

Then import it.

```js
import VT from 'variable-type'; // ES6
var VT = require('variable-type'); // ES5 with npm
```

Or just import it in HTML with script tag, you will get a global variable named `VariableType`.


## 2. Usage

Here is some simple examples. More you can see in [test.js](test.js) file.

 - `Array` type.

```js
var arr = ['hello', 'world', 25, new Date(1992, 8, 1)];
 
var types = VT.arrayOf(
  VT.oneOfType([
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
  f: VT.oneOf([1, '1']),
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
}); // Then will get true.
```


## 3. API & Types

The unique API is `check(variable, type)`. And the library contains `Types` below:

 - **VT.bool**
 - **VT.func**
 - **VT.number**
 - **VT.string**
 - **VT.object**
 - **VT.array**
 - **VT.any**
 - **VT.null**
 - **VT.undefined**
 - **VT.instanceOf**
 - **VT.oneOf**
 - **VT.oneOfType**
 - **VT.arrayOf**
 - **VT.shape**
 - **VT.and**
 - **VT.or**

You can all the usage in the [test cases file](test.js).

If more Types are needed, welcome to `send a pull request`, or put an issue to me.


## 4. Test

```
npm i

npm run test
```


## License

ISC@[hustcc](https://github.com/hustcc).



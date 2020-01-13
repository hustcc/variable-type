# variable-type

> A high-performance javascript(`less then 1 kb`) library, runtime **type checking** for variable and similar objects.
> 
> 一个非常简单的（仅 1 kb）高性能的用于做变量结构校验的 JavaScript 模块。
> 
> Inspired by [prop-types](https://github.com/facebook/prop-types).

[![npm Version](https://img.shields.io/npm/v/variable-type.svg)](https://www.npmjs.com/package/variable-type)
[![Build Status](https://github.com/hustcc/variable-type/workflows/build/badge.svg)](https://github.com/hustcc/variable-type/actions)
[![Coverage Status](https://coveralls.io/repos/github/hustcc/variable-type/badge.svg?branch=master)](https://coveralls.io/github/hustcc/variable-type?branch=master)
[![npm download](https://img.shields.io/npm/dm/variable-type.svg)](https://www.npmjs.com/package/variable-type)
[![npm License](https://img.shields.io/npm/l/variable-type.svg)](https://www.npmjs.com/package/variable-type)



## 1. Install

> **npm i --save variable-type**

Then import it.

```ts
import VT from 'variable-type';
```


## 2. API & Types

Before use it to check variable, you should make your Types.
 
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
 - **VT.typeOf(String)**
 - **VT.in(Array)**
 - **VT.arrayOf(Type)**
 - **VT.shape(TypeObject)**
 - **VT.and(TypeArray)**
 - **VT.or(TypeArray)**
 - **VT.not(Type)**
 - **VT.apply(Function)**

The `Type` has 2 API:

 - **check(value)**
 - **optional()**: convent the type into optional.

You can see all the usage in the [test cases file](tests/test.ts).

If more Types are needed, welcome to `send a pull request`, or put an issue to me.


## 3. Usage examples

Here is some examples. More you can see in [test.ts](tests/test.ts) file.

 - Simple usage

```js
VT.number.check(1992);
VT.string.check('hustcc');
VT.func.check(Math.min);
VT.bool.check(true);
VT.object.check({});
VT.array.check([1, 2, 3]);
VT.null.check(null);
VT.undefined.check(undefined);
VT.instanceOf(Date).check(new Date());
VT.in(['hustcc', 'hust', 'cc']).check('hustcc');
```

 - And / Or / Not

 ```js
VT.not(VT.in(['hustcc', 'cc'])).check('hustcc');

VT.and([
	VT.string
	VT.in(['hustcc', 1992]),
]).check('hustcc');

VT.or([
	VT.number,
	VT.string,
]).check('hustcc');
 ```

 - `Array` type.

```js
const arr = ['hello', 'world', 25, new Date(1992, 8, 1)];
 
const types = VT.arrayOf(
  VT.or([
    VT.number,
    VT.string,
    VT.instanceOf(Date)
  ])
);

types.check(arr); // will get true. 
```

 - `Object` type.

```js
const obj = {
  name: 'hustcc',
  boy: true,
  birthday: new Date(1992, 8, 1)
};
 
const types = VT.shape({
  name: VT.string,
  boy: VT.bool,
  birthday: VT.instanceOf(Date)
});

types.check(obj); // will get true. 
```

 - `Complex` example.

```js

// The only API `check`.
VT.shape({
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
          j: function() {}
        }
      ]
    }
  }
}); // Then will get true.
```

 - Optional type

```js
VT.shape({
  name: VT.string,
  birthday: VT.string,
  sex: VT.string.optional()
}).check({
  name: 'hustcc',
  birthday: '1992-08-01'
}); // Then will get true.
```


## 4. Test & Perf

```
# install dependence
$ npm i

# run unit test
$ npm run test

# run performance test
$ npm run perf
```

> [OPS] variable-type / prop-types = 5.033


## License

MIT@[hustcc](https://github.com/hustcc).



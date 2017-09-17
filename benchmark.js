/**
 * Created by hustcc.
 * Contract: i@hust.cc
 */

var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();

var VT = require('./');
var PT = require('prop-types');

var obj = {
  a: 1,
  b: '2',
  c: {
    d: new Date(),
    e: {
      f: [4, 5, 6],
      g: 'hustcc'
    }
  }
};

var VTchecker = VT.shape({
  a: VT.number,
  b: VT.string,
  c: VT.shape({
    d: VT.instanceOf(Date),
    e: VT.shape({
      f: VT.arrayOf(VT.number),
      g: VT.string
    })
  })
});


var PTchecker = PT.shape({
  a: PT.number,
  b: PT.string,
  c: PT.shape({
    d: PT.instanceOf(Date),
    e: PT.shape({
      f: PT.arrayOf(PT.number),
      g: PT.string
    })
  })
}).isRequired;

suite
  .add('variable-type', function () {
    VTchecker.check(obj);
  })
  .add('prop-types', function () {
    PT.checkPropTypes(PTchecker, obj, '', '');
  })
  .on('cycle', function (e) {
    console.log('' + e.target);
  })
  .on('complete', function() {
    var fast = this.filter('fastest');
    var slow = this.filter('slowest');
    console.log('[OPS] ' +
      fast.map('name') + ' / ' + slow.map('name') +
      ' = ' +
      (fast.map('hz') / slow.map('hz')).toFixed(3) +
      '\n'
    );
  })
  .run();
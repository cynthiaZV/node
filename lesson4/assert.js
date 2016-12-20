/**
 * Created by Administrator on 2016/12/14.
 */
const assert = require('assert');

assert(true);  // OK
assert(1);     // OK
assert(false);
// throws "AssertionError: false == true"
assert(0);
// throws "AssertionError: 0 == true"
assert(false, 'it\'s false');
// throws "AssertionError: it's false"
/*
 * Copyright 2013, All Rights Reserved.
 *
 * Code licensed under the BSD License:
 * https://github.com/node-gh/gh/blob/master/LICENSE.md
 *
 * @author Zeno Rocha <hi@zenorocha.com>
 */

// -- Requires -----------------------------------------------------------------
var assert = require('assert');

// -- Suites -------------------------------------------------------------------
describe('A test suite', function() {
    it('should return a hello world message', function(){
        var hello = 'Hello world :)';
        assert.equal('Hello world :)', hello);
    });
});
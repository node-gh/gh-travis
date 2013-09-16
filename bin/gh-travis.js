/*
 * Copyright 2013, All Rights Reserved.
 *
 * Code licensed under the BSD License:
 * https://github.com/node-gh/gh/blob/master/LICENSE.md
 *
 * @author Author <email@email.com>
 */

var GH_PATH = process.env.GH_PATH;

// -- Requires -----------------------------------------------------------------
var logger = require(GH_PATH + 'lib/logger'),
    open = require('open');

// -- Constructor --------------------------------------------------------------
function Travis(options) {
    this.options = options;
}

// -- Constants ----------------------------------------------------------------
Travis.DETAILS = {
    alias: 'tr',
    description: 'Travis Plugin for Node-GH.',
    options: {
        'browser': Boolean
    },
    shorthands: {
        'B': [ '--browser' ]
    },
    payload: function(payload, options) {
        options.browser = true;
    }
};

// -- Commands -----------------------------------------------------------------
Travis.prototype.run = function() {
    var instance = this,
        options = instance.options;

    if (options.browser) {
        instance.browser(options.user, options.repo);
    }
};

Travis.prototype.browser = function(user, repo) {
    open('https://travis-ci.org/' + user + '/' + repo);
};

exports.Impl = Travis;
#!/usr/bin/env node

/*
 * Copyright 2013, All Rights Reserved.
 *
 * Code licensed under the BSD License:
 * https://github.com/node-gh/gh/blob/master/LICENSE.md
 *
 * @author Henrique Vicente <henriquevicente@gmail.com>
 * @author Zeno Rocha <zno.rocha@gmail.com>
 */

var GH_PATH = process.env.GH_PATH;

// -- Requires -----------------------------------------------------------------
var logger = require(GH_PATH + 'lib/logger'),
    openUrl = require('open'),
    TravisCi = require('travis-ci'),
    travisCi = new TravisCi({version: '2.0.0'});

// -- Constructor --------------------------------------------------------------
function Travis(options) {
    this.options = options;
}

// -- Constants ----------------------------------------------------------------
Travis.DETAILS = {
    alias: 'tr',
    commands: [
        'browser',
        'list'
    ],
    description: 'NodeGH plugin for integrating Travis, a continous integration server',
    options: {
        'all': Boolean,
        'browser': Boolean,
        'detailed': Boolean,
        'list': Boolean,
        'user': String,
        'repo': String
    },
    shorthands: {
        'a': [ '--all' ],
        'B': [ '--browser' ],
        'd': [ '--detailed' ],
        'l': [ '--list' ],
        'u': [ '--user' ],
        'r': [ '--repo' ]
    },
    payload: function(payload, options) {
        options.list = true;
    }
};

// -- Commands -----------------------------------------------------------------
Travis.prototype.run = function() {
    var instance = this,
        options = instance.options;

    if (options.browser) {
        instance.browser(options.user, options.repo);
    }

    if (options.list) {
        if (!options.repo) {
            options.all = true;
        }

        logger.logTemplate('[info] Listing last builds for {{greenBright user}}' +
            '{{#if notAll}}{{greenBright "/" repo}}{{/if}}', {
            notAll: !options.all,
            user: options.user,
            repo: options.repo
        });

        instance.list(options.user, options.repo);
    }
};

Travis.prototype.browser = function(user, repo) {
    openUrl('https://travis-ci.org/' + user + '/' + repo);
};

Travis.prototype.list = function(user, repo) {
    var instance = this,
        options = instance.options,
        payload = {};

    payload.owner_name = user;

    if (!options.all) {
        payload.name = repo;
    }

    logger.registerHelper('state', function(state) {
        var color = logger.clc.magentaBright;

        if (state === 'passed') {
            color = logger.clc.greenBright;
        }
        else if (state === 'started') {
            color = logger.clc.blueBright;
        }
        else if (state === 'failed') {
            color = logger.clc.redBright;
        }
        else if (state === 'errored') {
            color = logger.clc.redBright;
        }

        return color(state);
    });

    travisCi.repos(payload, function (err, builds) {
        instance.buildsCallback_(err, builds);
    });
};

Travis.prototype.buildsCallback_ = function(err, builds) {
    var instance = this,
        options = instance.options,
        repos = [];

    try {
        err = JSON.parse(err);
    }
    catch (e) {
    }

    if (err) {
        logger.error(err.file);
    }

    // Normalize object for one or more repos
    if (builds && builds.repo) {
        repos = [builds.repo];
    }
    else if (builds && builds.repos) {
        repos = builds.repos;
    }

    if (repos.length > 0) {
        logger.logTemplateFile(__dirname + '/list.handlebars', {
            detailed: options.detailed,
            repos: repos
        });
    }
};

exports.Impl = Travis;
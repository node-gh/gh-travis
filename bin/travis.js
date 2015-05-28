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

 'use strict';

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

        instance.list(options.user, options.repo);
    }
};

Travis.prototype.browser = function(user, repo) {
    openUrl('https://travis-ci.org/' + user + '/' + repo);
};

Travis.prototype.list = function(user, repo) {
    var instance = this,
        options = instance.options,
        header = 'Listing last builds for ' + logger.colors.green(user);

    if (!options.all) {
        header += logger.colors.green('/' + repo);
    }

    logger.log(header);

    if (options.all) {
            travisCi.repos(user).get(function (err, builds) {
            instance.buildsCallback_(err, builds);
        });
    }
    else {
        travisCi.repos(user, repo).get(function (err, builds) {
            instance.buildsCallback_(err, builds);
        });
    }
};

Travis.prototype.printRepo_ = function(repo) {
    var options = this.options,
        content = logger.colors.yellow(repo.slug) + '\n';

    if (options.detailed) {
        if (repo.last_build_id) {
            content += 'Last build #' + repo.last_build_id + ' ' + repo.last_build_state + ' ' +
                logger.getDuration(repo.last_build_started_at) + '\n'
                logger.colors.blue('https://travis-ci.org/' + repo.slug + '/builds/' + repo.last_build_id);
        } else {
            content += 'There are no builds for this repository.\n';
        }
    }

    logger.log(content);
};

Travis.prototype.buildsCallback_ = function(err, builds) {
    var repos = [];

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
        repos.forEach(this.printRepo_, this);
    }
};

exports.Impl = Travis;
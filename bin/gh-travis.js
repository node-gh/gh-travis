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

        logger.logTemplate('{{prefix}} [info] Listing builds for {{greenBright user}}' +
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
        logger.logTemplate('{{#each repos}}' +
            '{{../prefix}} {{{yellowBright "➜ " slug}}}\n' +
            '{{../prefix}}' +
            '     {{#if last_build_id}}{{{greenBright "#" last_build_id}}} {{{last_build_state}}}{{else}} There are no builds for this repository.{{/if}}' +
            '{{#if last_build_started_at}} ({{date last_build_started_at}}){{/if}}\n' +
            '{{#if ../detailed}}' +
            '{{../../prefix}}     {{{blueBright "https://travis-ci.org/" slug "/builds/" id}}}\n' +
            '{{/if}}' +
            '{{/each}}' +
            '{{prefix}}', {
            detailed: options.detailed,
            repos: repos
        });
    }
};

exports.Impl = Travis;
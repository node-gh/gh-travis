# GH Travis

[![NPM version](http://img.shields.io/npm/v/gh-travis.svg?style=flat)](http://npmjs.org/gh-travis)
[![NPM downloads](http://img.shields.io/npm/dm/gh-travis.svg?style=flat)](http://npmjs.org/gh-travis)
[![Build Status](http://img.shields.io/travis/node-gh/gh-travis/master.svg?style=flat)](https://travis-ci.org/node-gh/gh-travis)
[![Dependencies Status](http://img.shields.io/david/node-gh/gh-travis.svg?style=flat)](https://david-dm.org/node-gh/gh-travis)
[![DevDependencies Status](http://img.shields.io/david/dev/node-gh/gh-travis.svg?style=flat)](https://david-dm.org/node-gh/gh-travis#info=devDependencies)

NodeGH plugin for integrating [Travis](https://travis-ci.org/), a continous integration server.

> Maintained by [Henrique Vicente](https://github.com/henvic).

## Install

```
[sudo] npm install -g gh gh-travis
```

## Usage

```
gh travis
```

> **Alias:** `gh tr`

### 1. List

Option            | Usage        | Type
---               | ---          | ---
`-l`, `--list`    | **Required** | `Boolean`
`-a`, `--all`     | *Optional*   | `Boolean`
`-d`, `--detailed`| *Optional*   | `Boolean`
`-r`, `--repo`    | *Optional*   | `String`
`-u`, `--user`    | *Optional*   | `String`

#### Examples

* **Shortcut** for listing build status for current repo.

    ```
gh tr
    ```

* List build status for all repos.

    ```
gh tr --list --all
    ```

* List build status with link.

    ```
gh tr --list --detailed
    ```

### 2. Open in Browser

Option                 | Usage        | Type
---                    | ---          | ---
`-B`, `--browser`      | **Required** | `Boolean`
`-r`, `--repo`         | *Optional*   | `String`
`-u`, `--user`         | *Optional*   | `String`

#### Examples

* Opening Travis page in the browser for current repo.

    ```
gh tr --browser
    ```

* Open Travis page in the browser for a certain repo.

    ```
gh tr --browser -user node-gh --repo gh-travis
    ```

## Testing

Check [Travis](https://travis-ci.org/node-gh/gh-travis) for continous integration results.

* Run [JSHint](http://www.jshint.com/), a tool to detect errors and potential problems.

    ```
npm run-script lint
    ```

* Run [Mocha](http://visionmedia.github.io/mocha/), a unit test framework.

    ```
npm run-script test
    ```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

Check [Release](https://github.com/node-gh/gh-travis/releases) list.

## License

[BSD License](https://github.com/node-gh/gh/blob/master/LICENSE.md)

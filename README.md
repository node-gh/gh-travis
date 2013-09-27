# GH Travis [![Build Status](https://secure.travis-ci.org/node-gh/gh-travis.png?branch=master)](https://travis-ci.org/node-gh/gh-travis) [![NPM version](https://badge.fury.io/js/gh-travis.png)](http://badge.fury.io/js/gh-travis) [![Dependency Status](https://david-dm.org/node-gh/gh-travis.png)](https://david-dm.org/node-gh/gh-travis)

![Droidtocat](http://zno.io/RMCK/droidtocat.png)

NodeGH plugin for integrating [Travis](https://travis-ci.org/), a continous integration server.

> Maintained by [Henrique Vicente](https://github.com/henvic).

## Install

```
[sudo] npm install -g gh-travis
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
gh pr --list --detailed
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

See [Release](https://github.com/node-gh/gh-travis/releases) list.

## License

[BSD License](https://github.com/node-gh/gh/blob/master/LICENSE.md)

# new-gatsby-post

> Scaffold out a new [Gatsby](https://www.gatsbyjs.org/) post

[![Package Version](https://img.shields.io/npm/v/new-gatsby-post.svg?style=flat-square)](https://www.npmjs.com/package/new-gatsby-post)
[![Downloads Status](https://img.shields.io/npm/dm/new-gatsby-post.svg?style=flat-square)](https://npm-stat.com/charts.html?package=new-gatsby-post&from=2016-04-01)
[![Build Status: Linux](https://img.shields.io/travis/luftywiranda13/new-gatsby-post/master.svg?style=flat-square)](https://travis-ci.org/luftywiranda13/new-gatsby-post)
[![Build status: Windows](https://ci.appveyor.com/api/projects/status/urakliukex3h6lfd/branch/master?svg=true)](https://ci.appveyor.com/project/luftywiranda13/new-gatsby-post/branch/master)
[![Coverage Status](https://img.shields.io/codecov/c/github/luftywiranda13/new-gatsby-post/master.svg?style=flat-square)](https://codecov.io/gh/luftywiranda13/new-gatsby-post)

## Why

* Generates folder structure and `frontmatter`
* `Async/await` ready
* Simple API
* 100% test coverage
* Doesnʼt bundle a CLI. _See [new-gatsby-post-cli](https://github.com/luftywiranda13/new-gatsby-post-cli) for the command-line tool_

## Installation

```sh
npm install --save new-gatsby-post
```

## Usage

```sh
$ pwd
/Users/luftywiranda/blog
```

```js
const newGatsbyPost = require('new-gatsby-post');

newGatsbyPost('At Least I Tried', { date: '2013-08-05' }).then(path => {
  console.log(path);
  //=> '/Users/luftywiranda/blog/src/pages/blog/2013-08-05-at-least-i-tried'
});
```

```sh
$ tree
.
└── src
    └── pages
        └── blog
            └── 2013-08-05-at-least-i-tried
                └── index.md
```

## API

### newGatsbyPost(title, [options])

Returns a `promise` for the path to the created blog post's directory

#### title

Type: `string`

#### options

Type: `Object`

##### location

Type: `string`<br />
Default: `./src/pages/blog`

##### date

Type: `string` | `number` | `Date`<br />
Default: `Date.now()`

Date in `yyyy-mm-dd` format

## Related

* [new-gatsby-post-cli](https://github.com/luftywiranda13/new-gatsby-post-cli) – CLI for this module

## License

MIT &copy; [Lufty Wiranda](https://www.luftywiranda.com)

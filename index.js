'use strict';

const path = require('path');

const { fs } = require('mz');
const dateFormat = require('dateformat');
const dedent = require('dedent');
const is = require('@sindresorhus/is');
const kebabCase = require('lodash.kebabcase');
const startCase = require('lodash.startcase');
const makeDir = require('make-dir');

const newGatsbyPost = async (
  title,
  { location = './src/pages/blog', date = Date.now() } = {},
) => {
  if (is.falsy(title)) {
    throw new Error('`title` is required!');
  }

  const formattedDate = dateFormat(date, 'isoDate');
  const pathToPost = await makeDir(
    `${location}/${formattedDate}-${kebabCase(title)}`,
  );

  await fs.writeFile(
    path.join(`${pathToPost}`, 'index.md'),
    dedent`
      ---
      date: '${formattedDate}'
      title: ${startCase(title)}
      ---\n
    `,
    'utf8',
  );

  return pathToPost;
};

module.exports = newGatsbyPost;

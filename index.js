'use strict';

const dateFormat = require('dateformat');
const dedent = require('dedent');
const fs = require('fs-extra');
const is = require('@sindresorhus/is');
const kebabCase = require('lodash.kebabcase');
const startCase = require('lodash.startcase');

const newGatsbyPost = async (
  title,
  { location = './src/pages/blog', date = Date.now() } = {}
) => {
  if (is.falsy(title)) throw new Error('`title` is required!');

  const formattedDate = dateFormat(date, 'isoDate');
  const pathToPost = `${location}/${formattedDate}-${kebabCase(title)}`;

  await fs.outputFile(
    `${pathToPost}/index.md`,
    dedent`
      ---
      date: "${formattedDate}"
      title: "${startCase(title)}"
      ---\n
    `
  );

  return pathToPost;
};

module.exports = newGatsbyPost;

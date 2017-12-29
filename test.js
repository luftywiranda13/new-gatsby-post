'use strict';

const path = require('path');

const { fs } = require('mz');
const dedent = require('dedent');

const newGatsbyPost = require('./');

describe('throws', () => {
  it('throws if `title` is not provided', async () => {
    expect.assertions(1);

    try {
      await newGatsbyPost();
    } catch (err) {
      expect(err).toMatchSnapshot();
    }
  });
});

describe('folder structure', () => {
  it('uses `title` and defaults to `Date.now()`', async () => {
    expect.assertions(1);
    Date.now = jest.genMockFunction().mockReturnValue('2013-08-05');

    const pathToPost = await newGatsbyPost('At least I tried');

    expect(path.normalize(path.relative('./', pathToPost))).toBe(
      path.normalize('src/pages/blog/2013-08-05-at-least-i-tried')
    );

    jest.resetAllMocks();
  });

  it('uses user-defined dates', async () => {
    expect.assertions(1);

    const pathToPost = await newGatsbyPost('At least I tried', {
      date: '2017-08-05',
    });

    expect(path.normalize(path.relative('./', pathToPost))).toBe(
      path.normalize('src/pages/blog/2017-08-05-at-least-i-tried')
    );
  });

  it('puts the folder in the correct location', async () => {
    expect.assertions(1);
    Date.now = jest.genMockFunction().mockReturnValue('2013-08-05');

    const pathToPost = await newGatsbyPost('At least I tried', {
      location: 'src/pages',
    });

    expect(path.normalize(path.relative('./', pathToPost))).toBe(
      path.normalize('src/pages/2013-08-05-at-least-i-tried')
    );

    jest.resetAllMocks();
  });
});

describe('frontmatter template', () => {
  it('writes correct `title`', async () => {
    expect.assertions(1);
    Date.now = jest.genMockFunction().mockReturnValue('2013-08-05');

    const pathToPost = await newGatsbyPost('At least I tried');
    const content = await fs.readFile(
      path.normalize(`${pathToPost}/index.md`),
      'utf8'
    );

    expect(content).toBe(dedent`
      ---
      date: "2013-08-05"
      title: "At Least I Tried"
      ---\n
    `);

    jest.resetAllMocks();
  });

  it('writes correct `date`', async () => {
    expect.assertions(1);

    const pathToPost = await newGatsbyPost('At least I tried', {
      date: '2017-08-05',
    });
    const content = await fs.readFile(
      path.normalize(`${pathToPost}/index.md`),
      'utf8'
    );

    expect(content).toBe(dedent`
      ---
      date: "2017-08-05"
      title: "At Least I Tried"
      ---\n
    `);
  });
});

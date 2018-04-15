'use strict';

const path = require('path');
const fs = require('fs-extra');

const newGatsbyPost = require('.');

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
    expect.assertions(2);
    Date.now = jest.genMockFunction().mockReturnValue('2013-08-05');

    const pathToPost = await newGatsbyPost('At least I tried');

    expect(fs.pathExistsSync(pathToPost)).toBe(true);
    expect(pathToPost).toBe(
      path.resolve('src/pages/blog/2013-08-05-at-least-i-tried')
    );

    jest.resetAllMocks();
  });

  it('uses user-defined `date`', async () => {
    expect.assertions(2);

    const pathToPost = await newGatsbyPost('At least I tried', {
      date: '2017-08-05',
    });

    expect(fs.pathExistsSync(pathToPost)).toBe(true);
    expect(pathToPost).toBe(
      path.resolve('src/pages/blog/2017-08-05-at-least-i-tried')
    );
  });

  it('uses user-defined `location`', async () => {
    expect.assertions(2);
    Date.now = jest.genMockFunction().mockReturnValue('2013-08-05');

    const pathToPost = await newGatsbyPost('At least I tried', {
      location: 'src/pages',
    });

    expect(fs.pathExistsSync(pathToPost)).toBe(true);
    expect(pathToPost).toBe(
      path.resolve('src/pages/2013-08-05-at-least-i-tried')
    );

    jest.resetAllMocks();
  });
});

describe('frontmatter template', () => {
  it('writes correct `title`', async () => {
    expect.assertions(1);
    Date.now = jest.genMockFunction().mockReturnValue('2013-08-05');

    const pathToPost = await newGatsbyPost('At least I tried');
    const content = await fs.readFile(`${pathToPost}/index.md`, 'utf8');

    expect(content).toMatch(/title: "At Least I Tried"/);

    jest.resetAllMocks();
  });

  it('writes correct `date`', async () => {
    expect.assertions(1);

    const pathToPost = await newGatsbyPost('At least I tried', {
      date: '2017-08-05',
    });
    const content = await fs.readFile(`${pathToPost}/index.md`, 'utf8');

    expect(content).toMatch(/date: "2017-08-05"/);
  });
});

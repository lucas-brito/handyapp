/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */
/* eslint import/no-extraneous-dependencies: 0 */

const fs = require('fs');
const extract = require('i18n-extract');

const langs = ['pt', 'en'];

langs.forEach((item) => {
  const lang = require(`./app/locales/${item}.js`);
  const keys = extract.extractFromFiles(['app/**/*.js'], { marker: '__' })
    .filter((v, i, a) => a.findIndex(s => s.key === v.key) === i);

  let write = '/* eslint quotes: ["error", "single"] */\n/* eslint quote-props: ["error", "always"] */\nmodule.exports = {\n';
  let write1 = '';
  let write2 = '';

  keys.forEach((key) => {
    if (!(lang[key.key]) || lang[key.key] === '') {
      write1 += `  // '${key.key.replace("'", "\\'")}': '', // new\n`;
      console.log('new', key.key);
    } else {
      write2 += `  '${key.key.replace("'", "\\'")}': '${lang[key.key]}',\n`;
    }
  });

  write += `${write1}${write2}};\n`;
  fs.writeFile(`app/locales/${item}.js`, write, (err) => {
    if (err) {
      throw err;
    }
  });
});

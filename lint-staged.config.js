module.exports = {
  //Источник - https://www.thisdot.co/blog/linting-formatting-and-type-checking-commits-in-an-nx-monorepo-with-husky
  //https://stackblitz.com/github/tvanantwerp/nx-precommit-hooks?file=lint-staged.config.js
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': [
    files => `nx affected:lint --files=${files.join(',')}`,
    files => `nx format:write --files=${files.join(',')}`
  ]
};

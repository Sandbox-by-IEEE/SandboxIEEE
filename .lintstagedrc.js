module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'npm run typecheck',

  // Lint & Prettify TS and JS files
  '**/*.(ts|tsx|js)': () => [`npm run lint `, `npm run format`],

  // Prettify only Markdown and JSON files
  '**/*.(md|json)': () => `npm run format:write`,
};

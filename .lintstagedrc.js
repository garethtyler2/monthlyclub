module.exports = {
  // Run tests on all files (since tests are interconnected)
  '**/*.{js,jsx,ts,tsx}': () => 'npm run test:ci',
  
  // Run linting on changed files
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix'],
  
  // Run type checking
  '**/*.{ts,tsx}': () => 'npx tsc --noEmit',
}

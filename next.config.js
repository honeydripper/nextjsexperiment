module.exports = {
  // In the pages directory we have a page and a test file for the page.
  // nextjs considers all files in that directory to be a page to be built. so it chokes on the test file.
  // @see https://github.com/vercel/next.js/issues/3728
  // however we also have files in pages/api (for which we don't have tests :))
  // so temporarily including the .ts extension here for the build to go through.
  // once api is non-trivial and tests will be written nextjs will likely choke again.
  // So this issue needs to be dealt with at that time perhaps by renaming extension to api.ts.
  pageExtensions: ["page.tsx", "ts"],
};

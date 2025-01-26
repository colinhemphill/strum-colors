// @ts-check

/** @type {import("syncpack").RcFile} */
export default {
  dependencyTypes: ['prod', 'dev'],
  semverGroups: [
    {
      label: 'use exact version numbers in production and dev',
      packages: ['**'],
      dependencyTypes: ['**'],
      dependencies: ['**'],
      range: '',
    },
    {
      label: 'use Tailwind CSS v3',
      packages: ['**'],
      dependencyTypes: ['**'],
      dependencies: ['tailwindcss'],
      range: '^',
    },
  ],
  versionGroups: [
    {
      dependencies: ['tailwindcss'],
      pinVersion: '^3.4.17',
    },
  ],
};

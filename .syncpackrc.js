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
  ],
};

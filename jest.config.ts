import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@pages(.*)$': '<rootDir>/src/pages$1',
    '^@ui(.*)$': '<rootDir>/src/components/ui$1',
    '^@ui-pages(.*)$': '<rootDir>/src/components/ui/pages$1',
    '^@utils-types$': '<rootDir>/src/utils/types',
    '\\.(css|less|scss|sass)$': 'jest-css-modules-transform'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }]
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};

export default config;
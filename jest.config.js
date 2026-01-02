module.exports = {
  transform: {
    '^.+\\.[jt]s$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
          transform: {
            useDefineForClassFields: false,
            legacyDecorator: true,
            decoratorMetadata: true,
          },
          target: 'ES2021',
        },
        sourceMaps: 'inline',
      },
    ],
  },
  modulePathIgnorePatterns: [`dist/`],
  testPathIgnorePatterns: [`dist/`, `node_modules/`, `__fixtures__/`, `__mocks__/`],
  transformIgnorePatterns: ['node_modules/(?!(until-async|msw)/)'],
  testEnvironment: `node`,
  moduleFileExtensions: [`js`, `ts`],
  moduleNameMapper: {
    '^@models': '<rootDir>/src/models',
    '^@services': '<rootDir>/src/services',
    '^@repositories': '<rootDir>/src/repositories',
    '^@types': '<rootDir>/src/types',
    '^@utils': '<rootDir>/src/utils',
  },
}

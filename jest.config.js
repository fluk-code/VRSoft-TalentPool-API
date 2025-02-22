/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');

const paths = compilerOptions.paths;
/**
 * O uso do delete é necessário para remover o path "../*", que é utilizado pelo tsconfig para importar arquivos adequadamente.
 * Entretanto, essa configuração não é essencial no Jest, já que o Jest é capaz de gerenciar importações por conta própria.
 * Se mantivermos o path "../*" neste contexto, isso pode causar conflitos com o funcionamento do Jest.
 * Portanto, removemos esse path específico para garantir um comportamento consistente e livre de problemas nos testes.
 */
delete paths['../*'];

module.exports = {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  clearMocks: true,
  coverageDirectory: '../coverage/unit',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    'main.ts',
    'app.config.ts',
    '.d.ts',
    'typeorm-config.data-source.ts',
    'typeorm/entities',
    'typeorm/migrations',
    '.module.ts',
    '.provider.ts',
    '.interface.ts',
  ],
  rootDir: 'src',
  coverageProvider: 'v8',
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s?$': 'ts-jest',
  },
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: '<rootDir>/',
  }),
};

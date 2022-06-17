// mock = objetos/retornos simulados

export default {
    // limpar os mocks a cada execução dos testes
    clearMocks: true,
    // define que o projeto terá relatório de cobertura de teste
    collectCoverage: true,
    // onde será aplicado o relatório de cobertura de teste
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    // onde será gerado o relatorio
    coverageDirectory: 'coverage',
    // o que será ignorado no relatório
    coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
    // como o relatório irá rodar os testes
    coverageProvider: 'v8',
    // onde ficarão os testes
    roots: ['<rootDir>/tests'],
    // como os testes devem ser interpretados
    testEnvironment: 'node',
    // o que será ignorado no testes
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],
    // o que (e como) deve ser tratado no testes
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
};

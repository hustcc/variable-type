module.exports = {
    roots: ['tests'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: ['src/**/*.ts'],
    coveragePathIgnorePatterns: ['src/*.d.ts']
};

"use strict";
exports.__esModule = true;
var config = {
    preset: 'ts-jest',
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
    testPathIgnorePatterns: ['mocks.ts'],
    testRegex: '/test/.*\\.test\\.ts$',
    moduleFileExtensions: ['ts', 'js'],
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    }
};
exports["default"] = config;
//# sourceMappingURL=jest.config.js.map
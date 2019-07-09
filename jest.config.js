module.exports = {
    "testEnvironment": "jsdom",
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "collectCoverage": false,
    "coverageDirectory": "coverage",
    "coverageReporters": [
        // "lcov",
        "text"
    ],
    "collectCoverageFrom": [
        "src/**/*.ts",
        "src/**/*.tsx",
        "!src/**/*.spec.ts",
        "!src/**/*.spec.tsx",
    ],
    "testMatch": [
        "<rootDir>/src/**/*.spec.ts",
        "<rootDir>/src/**/*.spec.tsx",
    ],
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json"
    ],
    "modulePathIgnorePatterns": [
        "<rootDir>/dist",
    ],
    "globals": {
        "ts-jest": {
            "diagnostics": false,
            "isolatedModules": true,
            "tsConfig": {
                "target": "esnext"
            }
        }
    }
};

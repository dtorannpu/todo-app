import type { Config } from "jest";
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './',
});

const config: Config = {
    testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);

declare function afterEach(fn: jest.EmptyFunction): void;
declare function beforeEach(fn: jest.EmptyFunction): void;
declare function describe(name: string, fn: jest.EmptyFunction): void;
declare function expect(actual: any): jest.Matchers;
declare function it(name: string, fn: jest.EmptyFunction): void;
declare function fit(name: string, fn: jest.EmptyFunction): void;

declare function test(name: string, fn: jest.EmptyFunction): void;
declare function xdescribe(name: string, fn: jest.EmptyFunction): void;
declare function xit(name: string, fn: jest.EmptyFunction): void;

declare namespace jest {
    interface Matchers {
        lastCalledWith(...args: any[]): boolean;
        not: Matchers;
        toBe(expected: any): boolean;
        toBeCalled(): boolean;
        toBeCalledWith(...args: any[]): boolean;
        toBeCloseTo(expected: number, delta: number): boolean;
        toBeDefined(): boolean;
        toBeFalsy(): boolean;
        toBeGreaterThan(expected: number): boolean;
        toBeGreaterThanOrEqual(expected: number): boolean;
        toBeLessThan(expected: number): boolean;
        oBeLessThanOrEqual(expected: number): boolean;
        toBeNull(): boolean;
        toBeTruthy(): boolean;
        toBeUndefined(): boolean;
        toContain(expected: string): boolean;
        toEqual(expected: any): boolean;
        toMatch(expected: RegExp): boolean;
        toMatchSnapshot(): boolean;
        toThrow(): boolean;
        toThrowError(expected: string | RegExp): boolean;
        toThrowError<TFunction extends Function>(expected: TFunction): boolean;
    }
    
    interface MockContext<T> {
        calls: any[][];
        instances: T[];
    }

    interface Mock<T> {
        new (): T;
        (...args: any[]): any; // Making Mock Callable and fixing: Value of type 'Mock<T>' is not callable.
        mock: MockContext<T>;
        mockClear(): void;
        mockImplementation(fn: Function): Mock<T>;
        mockImplementationOnce(fn: Function): Mock<T>;
        mockReturnThis(): Mock<T>;
        mockReturnValue(value: any): Mock<T>;
        mockReturnValueOnce(value: any): Mock<T>;
    }
    
    interface EmptyFunction {
        (): void;
    }
    
    function clearAllTimers(): void;
    function disableAutomock(): void;
    function enableAutomock(): void;
    function fn<T>(implementation?: Function): Mock<T>;
    function isMockFunction<T>(fn: Function): Mock<T>;
    function genMockFromModule<T>(moduleName: string): Mock<T>;
    function mock(moduleName: string, factory?: Function, options?: {virtual: boolean}): void;
    function resetModules(): void;
    function runAllTicks(): void;
    function runAllTimers(): void;
    function runOnlyPendingTimers(): void;
    function setMock<T>(moduleName: string, moduleExports: T): void;
    function unmock(moduleName: string): void;
    function useFakeTimers(): void;
    function useRealTimers(): void;

    interface ArrayLike<T> {
        length: number;
        [n: number]: T;
    }
}

interface NodeRequire {
    requireActual(moduleName: string): any;
    requireMock(moduleName: string): any;
}

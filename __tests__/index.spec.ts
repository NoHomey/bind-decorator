import bind from './../src';

describe('@bind', function () {
    describe('when used as ClassDecorator', function () {
        it('throws TypeError when decorating class', function () {
            function decorateClass() {
                @(bind as ClassDecorator)
                class decorated {

                }
            }

            expect(decorateClass).toThrowError(TypeError);
            expect(decorateClass).toThrowError(`Only functions can be decorated with @bind. <undefined> is not a function!`);
        });
    });

    describe('when used as PropertyDecorator', function () {
        it('throws TypeError when decorating property', function () {
            function decorateProperty() {
                class decorated {
                    @(bind as PropertyDecorator)
                    private someProperty: string;
                }
            }

            expect(decorateProperty).toThrowError(TypeError);
            expect(decorateProperty).toThrowError(`Only functions can be decorated with @bind. <someProperty> is not a function!`);
        });
    });

    describe('when used as ParameterDecorator', function () {
        it('throws TypeError when decorating paramter', function () {
            function decorateParameter() {
                class decorated {
                    constructor(@(bind as ParameterDecorator) private someParam: string) {

                    }
                }
            }

            expect(decorateParameter).toThrowError(TypeError);
            expect(decorateParameter).toThrowError(`Only functions can be decorated with @bind. <undefined> is not a function!`);
        });
    });

    describe('when used as MethodDecorator', function () {
        it('dose not throw when decorating method', function () {
            function decorateMethod() {
                class decorated {
                    @bind
                    private method(): void {

                    }
                }
            }

            expect(decorateMethod).not.toThrow();
        });

        describe('when used to bind to this context', function () {
            it('binds decorated method to this context', function () {
                class thisContext {
                    private test: string;

                    public constructor() { }

                    public getTest(): string {
                        return this.test;
                    }

                    @bind
                    public setTest(test: string): void {
                        this.test = test;
                    }
                }

                const tested: thisContext = new thisContext();
                const { setTest } = tested;
                setTest('unit');

                expect(tested.getTest()).toBe('unit');
            });
        });

        describe('when used to bind to static context', function () {
            it('binds decorated method to static context', function () {
                class staticContext {
                    private static test: string;

                    public static getTest(): string {
                        return this.test;
                    }

                    @bind
                    public static setTest(test: string): void {
                        this.test = test;
                    }
                }

                const { setTest } = staticContext;
                setTest('unit');

                expect(staticContext.getTest()).toBe('unit');
            });
        });

        describe('when multiple references to bound method are obtained', function () {
            it('always returns the same bound method reference', function () {
                class Decorated {
                    public constructor() {

                    }

                    @bind
                    public method(): void {

                    }
                }

                const tested: Decorated = new Decorated();
                const ref1: Function = tested.method;
                const ref2: Function = tested.method;
                expect(ref1).toBe(tested.method);
                expect(ref2).toBe(tested.method);
                expect(ref2).toBe(ref1);
            });
        });
    });
});
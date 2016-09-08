Run this code:

```typescript
function bind<T extends Function>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
	if(!descriptor || (typeof descriptor.value !== 'function')) throw new TypeError(`Only functions can be decorated with @bind. <${propertyKey}> is not a function!`);
	
	return {
		configurable: true,
		get(): T {
			return descriptor.value.bind(this);
		}
	};
}

class Test {
	public static what: string = 'static';
	
    @bind
    public static test(): void {
    	console.log(this.what);
    }

    @(bind as Function) // Uncaught TypeError: Only functions can be decorated with @bind. <failed> is not a function!
    public failed: boolean;

    public constructor(public what: string) {
        this.what = what;
    }

    @bind
    public test(): void {
        console.warn(this.what);
    }
}

const test: Test = new Test('bind');
const { test: tester } = test;
test.test();
tester();
Test.test();
```

In TypeScript [Playground](http://www.typescriptlang.org/play/index.html)

Run this code:

```typescript
function bind<T extends Function>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
	if(!descriptor || (typeof descriptor.value !== 'function')) throw new TypeError(`Only functions can be decorated with @bind. <${propertyKey}> is not a function!`);
	
	return {
		configurable: true,
		get(): T {
			console.log(target, this, this.prototype, this._proto_, this.__proto__);
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
test.test(); // Object Test undefined undefined Object \n // bind
tester(); // Object Test undefined undefined Object \n // bind
Test.test(); // function Test, Object, undefined, function() {} \n // static 
for(let k in test) {
	console.info(`<${k}> is enumerable`); // <what> is enumerable \n // <test> is enumerable
```

In TypeScript [Playground](http://www.typescriptlang.org/play/index.html)

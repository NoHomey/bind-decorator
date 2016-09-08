# bind-decorator
The best automatic context method binding decorator

- It will `throw` exceptions if decorating anything other than `function`, [run this](throws.md);
- Since the implementation follows the latest `decorator`s [purposal](http://tc39.github.io/proposal-decorators/) where compartion betweeen `this` and `target` can not be trusted, [run this if you don't belive me](not-comparable.md). `@bind` will always `return` a `configurable`, `enumerable` `get accessor propertyDescriptor` with value of `descriptor.value.bind(this)`.

In fact the whole implementation is just 12 lines of code:

```typescript
export function bind<T extends Function>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
	if(!descriptor || (typeof descriptor.value !== 'function')) throw new TypeError(`Only functions can be decorated with @bind. <${propertyKey}> is not a function!`);
	
	return {
		configurable: true,
		get(): T {
			return descriptor.value.bind(this);
		}
	};
}

export default bind;
```

# Install

[![NPM](https://nodei.co/npm/bind-decorator.png?downloads=true&stars=true)](https://nodei.co/npm/bind-decorator/)

# Usage

## In JavaScript

```javascript
import bind from 'bind-decorator';

class Test {
    static what = 'static';
    
    @bind
    static test() {
        console.log(this.what);
    }

    constructor(what) {
        this.what = what;
    }

    @bind
    test() {
        console.warn(this.what);
    }
}

const tester = new Test('bind');
const { test } = tester;
tester.test(); // warns 'bind'.
test(); // warns 'bind'.
Test.test(); // logs 'static'.
```

## In TypeScript

```typescript
import bind from 'bind-decorator';

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

const tester: Test = new Test('bind');
const { test } = tester;
tester.test(); // warns 'bind'.
test(); // warns 'bind'.
Test.test(); // logs 'static'.
```


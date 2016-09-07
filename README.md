# bind-decorator
The best automatic context method binding decorator

- It will `throw` exceptions if decorating anything other than `function` [check this](http://www.typescriptlang.org/play/index.html#src=function%20bind%3CT%20extends%20Function%3E(target%3A%20Object%2C%20propertyKey%3A%20string%20%7C%20symbol%2C%20descriptor%3A%20TypedPropertyDescriptor%3CT%3E)%3A%20TypedPropertyDescriptor%3CT%3E%20%7C%20void%20%7B%0D%0A%09if(!descriptor%20%7C%7C%20(typeof%20descriptor.value%20!%3D%3D%20'function'))%20throw%20new%20TypeError(%60Only%20functions%20can%20be%20decorated%20with%20%40bind.%20%3C%24%7BpropertyKey%7D%3E%20is%20not%20a%20function!%60)%3B%0D%0A%09%0D%0A%09return%20%7B%0D%0A%09%09configurable%3A%20true%2C%0D%0A%09%09get()%3A%20T%20%7B%0D%0A%09%09%09%2F%2Fconsole.log(target%2C%20this%2C%20this.prototype%2C%20this._proto_%2C%20this.__proto__)%3B%0D%0A%09%09%09return%20descriptor.value.bind(this)%3B%0D%0A%09%09%7D%0D%0A%09%7D%3B%0D%0A%7D%0D%0A%0D%0Aclass%20Test%20%7B%0D%0A%09public%20static%20what%3A%20string%20%3D%20'static'%3B%0D%0A%09%0D%0A%20%20%20%20%40bind%0D%0A%20%20%20%20public%20static%20test()%3A%20void%20%7B%0D%0A%20%20%20%20%09console.log(this.what)%3B%0D%0A%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%40(bind%20as%20Function)%0D%0A%20%20%20%20public%20failed%3A%20boolean%3B%0D%0A%0D%0A%20%20%20%20public%20constructor(public%20what%3A%20string)%20%7B%0D%0A%20%20%20%20%20%20%20%20this.what%20%3D%20what%3B%0D%0A%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%40bind%0D%0A%20%20%20%20public%20test()%3A%20void%20%7B%0D%0A%20%20%20%20%20%20%20%20console.warn(this.what)%3B%0D%0A%20%20%20%20%7D%0D%0A%7D%0D%0A%0D%0Aconst%20test%3A%20Test%20%3D%20new%20Test('bind')%3B%0D%0Aconst%20%7B%20test%3A%20tester%20%7D%20%3D%20test%3B%0D%0Atest.test()%3B%0D%0Atester()%3B%0D%0ATest.test()%3B%0D%0Afor(let%20k%20in%20test)%20%7B%0D%0A%09console.info(%60%24%7Bk%7D%20is%20enumerable%60)%3B%0D%0A%7D);
- Since the implementation follows the latest `decorator`s [purposal](http://tc39.github.io/proposal-decorators/) where compartion betweeen `this` and `target` can not be trusted [run this if you don't belive me](http://www.typescriptlang.org/play/index.html#src=function%20bind%3CT%20extends%20Function%3E(target%3A%20Object%2C%20propertyKey%3A%20string%20%7C%20symbol%2C%20descriptor%3A%20TypedPropertyDescriptor%3CT%3E)%3A%20TypedPropertyDescriptor%3CT%3E%20%7C%20void%20%7B%0D%0A%09if(!descriptor%20%7C%7C%20(typeof%20descriptor.value%20!%3D%3D%20'function'))%20throw%20new%20TypeError(%60Only%20functions%20can%20be%20decorated%20with%20%40bind.%20%3C%24%7BpropertyKey%7D%3E%20is%20not%20a%20function!%60)%3B%0D%0A%09%0D%0A%09return%20%7B%0D%0A%09%09configurable%3A%20true%2C%0D%0A%09%09get()%3A%20T%20%7B%0D%0A%09%09%09console.log(target%2C%20this%2C%20this.prototype%2C%20this._proto_%2C%20this.__proto__)%3B%0D%0A%09%09%09return%20descriptor.value.bind(this)%3B%0D%0A%09%09%7D%0D%0A%09%7D%3B%0D%0A%7D%0D%0A%0D%0Aclass%20Test%20%7B%0D%0A%09public%20static%20what%3A%20string%20%3D%20'static'%3B%0D%0A%09%0D%0A%20%20%20%20%40bind%0D%0A%20%20%20%20public%20static%20test()%3A%20void%20%7B%0D%0A%20%20%20%20%09console.log(this.what)%3B%0D%0A%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%2F%2F%40(bind%20as%20Function)%0D%0A%20%20%20%20public%20failed%3A%20boolean%3B%0D%0A%0D%0A%20%20%20%20public%20constructor(public%20what%3A%20string)%20%7B%0D%0A%20%20%20%20%20%20%20%20this.what%20%3D%20what%3B%0D%0A%20%20%20%20%7D%0D%0A%0D%0A%20%20%20%20%40bind%0D%0A%20%20%20%20public%20test()%3A%20void%20%7B%0D%0A%20%20%20%20%20%20%20%20console.warn(this.what)%3B%0D%0A%20%20%20%20%7D%0D%0A%7D%0D%0A%0D%0Aconst%20test%3A%20Test%20%3D%20new%20Test('bind')%3B%0D%0Aconst%20%7B%20test%3A%20tester%20%7D%20%3D%20test%3B%0D%0Atest.test()%3B%0D%0Atester()%3B%0D%0ATest.test()%3B%0D%0Afor(let%20k%20in%20test)%20%7B%0D%0A%09console.info(%60%24%7Bk%7D%20is%20enumerable%60)%3B%0D%0A%7D). `@bind` will always `return` a `configurable`, `enumerable` `get accessor propertyDescriptor` with value of `descriptor.value.bind(this)`.

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


export function bind<T>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
    if(!descriptor || (typeof descriptor.value !== 'function')) {
        throw new TypeError(`Only functions can be decorated with @bind. <${propertyKey}> is not a function!`);
    }
    
    return {
        configurable: true,
        get(this: T): T {
            const bound: T = (descriptor.value as any as Function).bind(this);
            // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
            Object.defineProperty(this, propertyKey, { value: bound, configurable: true, writable: true });
            return bound;
        }
    };
}

export default bind;
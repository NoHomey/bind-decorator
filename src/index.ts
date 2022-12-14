export function bind<T extends Function>(
    target: object, 
    propertyKey: string, 
    descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void {
    if(!descriptor || (typeof descriptor.value !== 'function')) {
        throw new TypeError(`Only methods can be decorated with @bind. <${propertyKey}> is not a method!`);
    }
    
    return {
        configurable: true,
        set(value) {
            Object.defineProperty(this, propertyKey, {
                value: value,
                configurable: true,
                writable: true
            });
        },
        get(this: T): T {
            const bound: T = descriptor.value!.bind(this);
            // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: true,
                writable: true
            });
            return bound;
        }
    };
}

export default bind;

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
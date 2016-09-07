export function bind<T extends Function>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
    if(descriptor === undefined) throw new Typeerror(`Only functions can be decorated with @bind. <${propertyKey}> is not a function!`);
    if(typeof descriptor.value !== 'function') throw new Typeerror(`Only functions can be decorated with @bind. <${propertyKey}> is not a function, called on ${typeof descriptor.value}!`);

    return {
        configurable: true,
        get(): T {
            return descriptor.value.bind(this);
        }
    };
}

export default bind;

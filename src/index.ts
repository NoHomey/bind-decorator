namespace constants {
    export const typeOfFunction: 'function' = 'function';
    export const boolTrue: boolean = true;
}

export function bind<T extends Function>(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
    if(!descriptor || (typeof descriptor.value !== constants.typeOfFunction)) {
        throw new TypeError(`Only methods can be decorated with @bind. <${propertyKey}> is not a method!`);
    }
    
    return {
        configurable: constants.boolTrue,
        get(this: T): T {
            const bound: T = descriptor.value!.bind(this);
            // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: constants.boolTrue,
                writable: constants.boolTrue
            });
            return bound;
        }
    };
}

export default bind;

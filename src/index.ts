export function bind<T extends Function>(target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void {
	return {
		configurable: false,
		enumerable: true,
		get(): T {
			return descriptor.value.bind(this);
		}
	};
}

export default bind;
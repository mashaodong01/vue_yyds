function reactive(vm, data, __set__) {
    Object.keys(data).forEach(key => {
        let value = data[key];
        Object.defineProperty(vm, key, {
            get() {
                return value
            },
            set(newVal) {
                const old = value;
                value = newVal;
                __set__(newVal, old, key, vm);
            }
        })
        if (typeof(data[key]) === 'object' && data[key] !== null) {
            reactive(vm[key], data[key]); 
        }
    })
}
export default reactive;
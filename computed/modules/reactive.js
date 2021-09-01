export default function reactive(target, __set__) {
    Object.keys(target).forEach(key => {
        Object.defineProperty(this, key, {
            get() {
                return target[key];
            },
            set(newVal) {
                const oldVal = target[key];
                target[key] = newVal;
                __set__(key, newVal, oldVal);
            }
        })
    })
}
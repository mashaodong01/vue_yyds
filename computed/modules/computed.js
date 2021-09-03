class Computed {
    constructor() {
        this.computedData = [];
    }
    addComputed(vm, key, computed) {
        const descriptor = Object.getOwnPropertyDescriptor(computed, key),
        descriptorFn = descriptor.value.get ? descriptor.value.get : descriptor.value,
        value = descriptorFn.call(vm),
        get = descriptorFn.bind(vm),
        dep = this._collectDep(descriptorFn);
        this.computedData.push({
            dirty: false,
            key,
            value,
            get,
            dep
        });
        const dataItem = this.computedData.find(item => item.key === key);
        Object.defineProperty(vm, key, {
            get() {
                if (dataItem.dirty) {
                    dataItem.dirty = false;
                    dataItem.value = dataItem.get();
                }
                return dataItem.value;
            },
            set() {
                dataItem.value = dataItem.get();
            }
        });
    }
    _collectDep(fn) {
        const matched = fn.toString().match(/this\.(.+?)/g);
        return matched.map(item => item.split('.')[1]);
    }
    update(key, newVal, oldVal) {
        this.computedData.map(item => {
            const dep = item.dep;
            for (let i of dep) {
                if (i === key && oldVal !== newVal) {
                    item.dirty = true;
                }
            }
        })   
    }
}

export default Computed;
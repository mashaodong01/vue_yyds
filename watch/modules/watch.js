export default class Watch{
    constructor(options) {
        this.watchData = [];
    }
    add(key, watchOp) {
        this.watchData.push({
            key,
            fn: watchOp.handler
        })
    }
    invoke(newVal, old, key, vm) {
        const item = this.watchData.find(i => i.key === key);
        if (item) {
            item.fn.call(vm, newVal, old)
        }
    }
}
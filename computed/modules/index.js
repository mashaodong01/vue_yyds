import reactive from "./reactive";
import Computed from "./computed";

class Vue {
    constructor(options) {
        this.$data = options.data();
        this.computedData  = options.computed;
        this.init();
    }
    init() {
        reactive.call(this, this.$data, (key, newVal, oldVal) => {
            this.computed.update(key, newVal, oldVal);
        });
        this.computed = this.initComputed();
    }
    initComputed() {
        const computed =  new Computed();
        for (let key in this.computedData) {
            computed.addComputed(this, key, this.computedData)
        }
        return computed;
    }
}
export default Vue;
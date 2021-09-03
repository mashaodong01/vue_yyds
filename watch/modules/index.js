import reactive from "./reactive";
import Watch from "./watch";

export default class Vue {
  constructor(options) {
    this.$data = options.data();
    this.$watch = options.watch;
    this.watchOp = this._initWatch();
    this._init();
  }
  _init() {
    reactive(this, this.$data, this.watchOp.invoke.bind(this.watchOp));
  }
  _initWatch() {
    const watch = new Watch();
    for (let key in this.$watch) {
      if (Object.hasOwnProperty.call(this.$watch, key)) {
        watch.add(key, this.$watch[key]);
      }
    }
    return watch;
  }
}

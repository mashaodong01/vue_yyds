import Vue from "../modules/index";

const vm = new Vue({
  data() {
    return {
      a: {
        b: 111,
      },
      c: 222,
    };
  },
  watch: {
    a: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal);
      },
      immediate: true,
      deep: true,      
    },
    c: {
      handler(newVal, oldVal) {
        console.log(newVal, oldVal, 'c改变了');
        console.log(this.c);
      },  
    },
  },
});

vm.c = 122;

import Vue from '../modules/index';

const vm = new Vue(
    {
        data() {
            return {
                a: 100,
                b: 200,
            }
        },
        computed: {
            count() {
                console.log('执行了一次computed');
                return this.a + this.b;
            }
        }
    }
)

console.log(vm.count);
console.log(vm.count);
console.log(vm.count);
vm.a = 300;
console.log(vm.count);
console.log(vm.count);
console.log(vm.count);
vm.b = 400;
console.log(vm.count);
console.log(vm.count);
console.log(vm.count);
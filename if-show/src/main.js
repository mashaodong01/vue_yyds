import Vue from'../modules/Vue';

const vm = new Vue({
  el: '#app',
  data () {
    return {
      isShowImg1: true,
      isShowImg2: true
      // data() -> $data -> vm
    }
  },
  beforeCreate () {
    // console.log('beforeCreate');
  },
  created () {
    // console.log('created');
  },
  beforeMount () {
    // console.log('beforeMount');
  },
  mounted () {
    this.isShowImg1 = false;
    this.isShowImg2 = false;
  },
  template: `
    <div>
      <div>
        <img v-if="isShowImg1" width="200" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201304%2F03%2F234931pwcmczi1zihcucmy.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628917111&t=39b489eccbeb07b87cf0900c428ff04d" />
        <img v-show="isShowImg2" width="200" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F31%2F111859myvyiivetyftfz2n.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1628917111&t=f49cf7a4aedba0cd7caf052e4836d796" />
      </div>
      <button @click="showImg1">显示图片1</button>
      <button @click="showImg2">显示图片2</button>
    </div>
  `,
  methods: {
    showImg1 () {
      this.isShowImg1 = !this.isShowImg1;
      // this -> vm -> showImg2 -> showImg2 -> vm
    },
    showImg2 () {
      this.isShowImg2 = !this.isShowImg2;
    }
  }
});

// console.log(vm)
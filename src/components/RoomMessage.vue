<template>
  <van-card
    :desc="item.desc"
    :thumb="'http://liufusong.top:8080' + item.houseImg"
    @click="todetailpage(item.houseCode)"
  >
    <template #title
      ><p class="van-ellipsis">{{ item.title }}</p>
    </template>
    <!-- 房屋的标签插槽 -->
    <template #tags>
      <van-tag plain class="one" type="danger">标签</van-tag>
      <van-tag plain class="two" type="danger">标签</van-tag>
    </template>
    <!-- 价格的插槽 -->
    <template v-slot:price>
      <span>{{ item.price }}</span
      ><span class="singlermb">元/月</span>
    </template>
  </van-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {}
  },
  methods: {
    // 点击的时候就把当前的code传给过去
    todetailpage (val) {
      this.$store.commit('gethouseCodeValue', val)
      console.log(val)
      this.$router.push({
        name: 'roomdetail',
        params: {
          houseCode: val
        }
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.address-search {
  .van-icon {
    line-height: 44px;
    color: #fff;
  }
  .van-search__label {
    display: flex;
    align-items: center;
    .location {
      height: 20px;
      width: 42px;
      border-right: 1px solid #9c9fa1;
    }
  }
}
.van-search__label {
  line-height: unset;
}
/deep/.van-search__content {
  width: 280px;
}
/deep/.van-nav-bar__title {
  max-width: unset;
  display: unset;
}
//  <!-- 取消和确定的键 -->
.select-bottom {
  height: 50px;
  width: 375px;
  background-color: pink;
  font-size: 18px;
  .cancel {
    width: 125px;
    height: 50px;
  }
  .define {
    width: 250px;
    height: 50px;
    background-color: #21b97a;
  }
}

.van-picker {
  position: relative;
}
/deep/ .van-picker__cancel {
  width: 125px;
  height: 50px;
  color: #21b97a;
  border: #21b97a 1px solid;
}
/deep/ .van-picker__confirm {
  width: 250px;
  height: 50px;
  background-color: #21b97a;
  color: #fff;
}
/deep/ .van-area {
  height: 349px;
}
// 房屋信息展示的组件
.van-card {
  height: 120px;
  padding-top: 18px;
  /deep/van-image,
  /deep/ .van-card__thumb,
  .van-image__img {
    width: 106px;
    height: 80px;
  }
  .van-card__content {
    padding-left: 12px;
  }
  .van-ellipsis {
    width: 220px;
    font-size: 15px;
    color: #394043;
    font-weight: bold;
    line-height: 22px;
  }
  .van-card__desc {
    font-size: 12px;
    color: #afb2b3;
    line-height: 22px;
  }
  .one {
    color: #39becd;
    background: #e1f5f8;
    margin-right: 5px;
  }
  .van-card__price {
    font-size: 21px;
    color: #fa5741;
  }
  .singlermb {
    font-size: 16px;
    color: #fa5741;
  }
}
/deep/ .van-picker__toolbar {
  position: absolute;
  bottom: 0px;
  z-index: 9;
}
/deep/.van-dropdown-menu__bar--opened {
  z-index: 1;
}
// /deep/.van-overlay {
//   max-width: 295px;
// }
.box {
  margin-left: 15px;
  width: 265px;
  padding-top: 15px;
  // 点击tags时候添加类
  .clicktags {
    // border: 1px solid #21b97a;
    color: #21b97a;
    // background-color: #328362;
    z-index: 9999;
  }
  h1 {
    margin: 20px 0;
    font-size: 15px;
  }
}
/deep/.van-checkbox__icon {
  border: 1px solid #21b97a;
  margin-bottom: 10px;
}
.van-row,
.tags {
  margin-right: 20px;
  margin-left: 40px;
  min-width: 250px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-bottom: rgb(124, 96, 96) 1px solid;
  .chechbox {
    text-align: center;
    line-height: 32px;
    text-align: center;
    font-size: 12px;
    margin: 0 10px 15px 0;
  }
  // align-items: center;
}
/deep/ .van-checkbox__icon {
  height: 32px;
  width: 70px;
}
.van-col--12 {
  width: 100%;
}
.van-checkbox {
  width: 75px;
}
</style>

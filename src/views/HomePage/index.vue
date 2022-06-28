<template>
  <div>
    <div class="slideshow-box">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
      <!-- 搜索框 -->
      <div class="address-search">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          background="transparent"
          ><template v-slot:label>
            <span @click="$router.push('/city')">地址</span>
          </template>
          <template #action>
            <div @click="onSearch">
              <van-icon name="location-o" size="30" />
            </div>
          </template>
        </van-search>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {

    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.slideshow-box {
  position: relative;
  width: 375px;
  height: 212px;
  background-color: pink;
  .address-search {
    position: absolute;
    top: 25px;
    left: 12px;
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 212px;
  text-align: center;
  background-color: #39a9ed;
}
.van-search--show-action {
  width: 350px;
}
</style>

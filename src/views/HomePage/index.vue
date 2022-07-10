<template>
  <div>
    <!-- 轮播图和搜索 -->
    <div class="slideshow-box">
      <!-- 轮播图 -->
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in slideShowPic" :key="item.id"
          ><van-image :src="'http://liufusong.top:8080' + item.imgSrc"
        /></van-swipe-item>
      </van-swipe>
      <!-- 搜索框 -->
      <div class="address-search">
        <van-search
          show-action
          placeholder="请输入小区或地址"
          @search="onSearch"
          background="transparent"
          ><template v-slot:label>
            <span @click="$router.push('/city')"
              ><div class="location">
                {{ $store.state.cityId.label }}
              </div></span
            >
          </template>
          <template #action>
            <div @click="onSearch">
              <van-icon
                name="location-o"
                size="25"
                @click="$router.push('/map')"
              />
            </div>
          </template>
        </van-search>
      </div>
    </div>
    <!-- 整租合租 -->
    <van-row class="rettip">
      <van-col span="6" @click="$router.push('/findhouse')"
        ><div>
          <img src="@/assets/home.png" alt="" />
          <h2>整租</h2>
        </div></van-col
      >
      <van-col span="6" @click="$router.push('/findhouse')"
        ><div>
          <img src="@/assets/people.png" alt="" />
          <h2>合租</h2>
        </div></van-col
      >
      <van-col span="6" @click="$router.push('/map')"
        ><div>
          <img src="@/assets/address.png" alt="" />
          <h2>地图找房</h2>
        </div></van-col
      >
      <van-col span="6" @click="$router.push('/addroom')"
        ><div>
          <img src="@/assets/rethouse.png" alt="" />
          <h2>去出租</h2>
        </div></van-col
      >
    </van-row>
    <!-- 租房小组 -->
    <van-cell-group>
      <van-cell title="租房小组" value="更多" />
    </van-cell-group>
    <!-- 渲染 -->
    <div class="home-news">
      <div class="box" v-for="item in homeGroups" :key="item.id">
        <img :src="'http://liufusong.top:8080' + item.imgSrc" alt="" />
        <div class="text">
          <p>{{ item.title }}</p>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { slideShowPicApi, homeGroupsApi } from '@/api/home'
export default {
  name: 'homepage',
  async created () {
    const { data } = await slideShowPicApi()
    this.slideShowPic = data.body
    this.$store.commit('getselsctCityId', this.$store.state.cityId.value ? this.$store.state.cityId : this.beijing)
    const res = await homeGroupsApi(this.$store.state.cityId.value ? this.$store.state.cityId.value : 'AREA|88cff55c-aaa4-e2e0')
    console.log(res)
    this.homeGroups = res.data.body
  },
  data () {
    return {
      slideShowPic: [],
      homeGroups: [],
      // 这是一个写死的，如果用户还没做操作，给定当前的为北京
      beijing: {
        label: '北京',
        value: 'AREA|88cff55c-aaa4-e2e0',
        pinyin: 'beijing',
        short: 'bj'
      }
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
}

.van-search__content {
  width: 310px;
  height: 34px;
}

.van-cell {
  padding-left: 8px;
}
.van-search__label {
  line-height: unset;
}
/deep/ .van-image {
  height: 100%;
}
.rettip {
  padding: 10px 0;
  text-align: center;
  img {
    width: 60px;
    height: 60px;
  }
  h2 {
    font-size: 14px;
    font-weight: 400;
  }
}
.van-cell__title {
  font-size: 15px;
  color: #333;
  font-weight: bold;
}
.home-news {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .box {
    width: 172.5px;
    height: 60px;
    background-color: rgb(237, 245, 245);
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    img {
      width: 50px;
      height: 50px;
      margin: 0 10px;
    }
    p {
      font-size: 14px;
      line-height: 25px;
    }
  }
}
</style>

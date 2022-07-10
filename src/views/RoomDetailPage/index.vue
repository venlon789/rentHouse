<template>
  <div>
    <van-nav-bar title="什么什么小区" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 轮播图和搜索 -->
    <div class="slideshow-box">
      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in slideShowPic" :key="index"
          ><van-image :src="'http://liufusong.top:8080' + item"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- /轮播图和搜索 -->
    <!-- title，price -->
    <div class="HouseDetail_info__w_ymp">
      <h3>{{ roomDetailDate.title }}</h3>
      <div class="tag">
        <van-tag color="#ffe1e1" text-color="#ad0000">标签</van-tag>
      </div>
      <!-- 租金，房型，面积 -->
      <van-grid :column-num="3">
        <van-grid-item>
          <template #default>
            <div>
              <span class="text-left">{{ roomDetailDate.price }}</span>
              <span class="text-right">/月</span>
            </div>
            <div class="text-bottom">租金</div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #default>
            <div>
              <span class="text-left">{{ roomDetailDate.roomType }}</span>
            </div>
            <div class="text-bottom">房型</div>
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #default>
            <div>
              <span class="text-left">{{ roomDetailDate.size }}</span>
              <span class="text-right">平米</span>
            </div>
            <div class="text-bottom">面积</div>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 租金，房型，面积 -->
      <van-row>
        <van-col span="12"
          ><span class="row-left-text">装修：</span
          ><span class="row-right-text">精装</span></van-col
        >
        <van-col span="12"
          ><span class="row-left-text">朝向：</span
          ><span class="row-right-text">{{
            roomDetailDate.oriented
          }}</span></van-col
        >
        <van-col span="12"
          ><span class="row-left-text">楼层：</span
          ><span class="row-right-text">{{
            roomDetailDate.floor
          }}</span></van-col
        >
        <van-col span="12"
          ><span class="row-left-text">类型：</span
          ><span class="row-right-text">普通住宅</span></van-col
        >
      </van-row>
    </div>
    <!-- /title，price -->
    <!-- 地图 -->
    <div class="map">
      <h3>小区：天山小气</h3>
      <div class="map-box"></div>
    </div>
    <!-- /地图 -->
    <!-- 房屋配套 -->
    <div class="house-suppot">
      <h3>房屋设备</h3>
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <van-grid :column-num="5">
          <van-grid-item v-for="(item, index) in houseSupport" :key="index">
            <template #default>
              <van-checkbox
                v-model="checked"
                :name="item.text"
                :style="{ color: changeColor ? '#21b97a' : '#000' }"
              >
                {{ item.text }}
                <template #icon>
                  <span :class="'iconfont ' + item.icon"></span>
                </template>
              </van-checkbox>
            </template>
          </van-grid-item>
        </van-grid>
      </van-checkbox-group>
    </div>
    <!-- /房屋配套 -->
    <!-- 房源概况 -->
    <div class="HouseDetail_describe">
      <h3>房源概况</h3>
      <!-- sahng -->
      <div class="HouseDetail_user">
        <div class="left">
          <img src="@/assets/avatar.png" alt="" />
          <div class="HouseDetail_useInfo">
            <p>王女士</p>
            <p class="text_color">
              <span><van-icon name="smile-o" /></span><span>已认证房主</span>
            </p>
          </div>
        </div>
        <div class="right">
          <van-button plain type="primary">发消息</van-button>
        </div>
      </div>
      <!-- 房屋的描述 -->
      <div class="HouseDetail_descText">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </div>
    </div>
    <!-- /房源概况 -->
    <!-- 猜你喜欢 -->
    <div class="HouseDetail_recommend">
      <h3>猜你喜欢</h3>
      <RoomMessage
        :item="item"
        v-for="(item, index) in queryHouseList"
        :key="index"
      ></RoomMessage>
    </div>
    <!-- /猜你喜欢 -->
    <!-- 底部收藏 -->
    <van-row class="button-detailRoom">
      <van-col span="8"
        ><van-button class="collect" type="default" @click="collectFn"
          ><template #default>
            <van-icon :name="isCollect ? 'star' : 'star-o'" />收藏
          </template></van-button
        ></van-col
      >
      <van-col span="8"
        ><van-button class="collect" type="default"
          >在线咨询</van-button
        ></van-col
      >
      <van-col span="8"
        ><van-button class="collect" type="primary"
          >电话预约</van-button
        ></van-col
      >
    </van-row>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { queryHouseApi } from '@/api/findhouse'
import RoomMessage from '@/components/RoomMessage.vue'
import { getroomDetailApi, addCollectApi, delCollectApi, queryCollectApi } from '@/api/roomdetail'
export default {
  created () {
    this.queryCollect()
    this.getroomDetail()
    this.getqueryHouse()
  },
  mounted () {

  },
  data () {
    return {
      // 收藏的效果
      isCollect: false,
      changeColor: false,
      result: [],
      checked: false,
      slideShowPic: [],
      roomDetailDate: {},
      houseSheBei: [
        { icon: 'rent-armoire', text: '衣柜', value: '' },
        { icon: 'rent-xiyiji', text: '洗衣机', value: '' },
        { icon: 'rent-kongtiao', text: '空调', value: '' },
        { icon: 'rent-meiqitianranqi', text: '天然气', value: '' },
        { icon: 'rent-bingxiang', text: '冰箱', value: '' },
        { icon: 'rent-shuinuanqigongcheng', text: '暖气', value: '' },
        { icon: 'rent-dianshiji', text: '电视', value: '' },
        { icon: 'rent-haofangtuo400iconfont2reshuiqi', text: '热水器', value: '' },
        { icon: 'rent-wifi', text: '宽带', value: '' },
        { icon: 'rent-shafa', text: '床', value: '' }],
      queryHouseList: [],
      houseSupport: [],
      houseCode: this.$route.params.houseCode
    }
  },
  methods: {
    // 查看是否收藏
    async queryCollect () {
      const res = await queryCollectApi(this.houseCode)
      console.log(res)
      this.isCollect = res.data.body.isFavorite
      console.log(this.isCollect)
    },
    // 获取房屋的详情信息
    async getroomDetail () {
      try {
        console.log(this.$store.state.houseCode)
        const res = await getroomDetailApi(this.$store.state.houseCode)
        console.log(res)
        this.roomDetailDate = res.data.body
        this.id = res.data.body.houseCode
        this.slideShowPic = res.data.body.houseImg
        console.log(this.roomDetailDate)
        this.houseSheBei.forEach(item => {
          this.roomDetailDate.supporting.forEach(ele => {
            if (item.text === ele) {
              this.houseSupport.push(item)
            }
          })
        })
      } catch (err) {
        console.log(err)
      }
      // 异步问题，获取到所以图片
      this.$nextTick(() => {
        const res = window.document.querySelectorAll('.slideshow-box img')
        console.log(res)
        if (res.length === 0) return
        const arr = []
        res.forEach((item, index) => {
          arr.push(item.src)
          item.onclick = function () {
            ImagePreview({
              images: arr,
              startPosition: index,
              maxZoom: 3,
              minZoom: 0.5,
              showIndicators: true
            })
          }
        })
      })
    },
    async getqueryHouse () {
      try {
        console.log(this.$store.state.cityId)
        const { data } = await queryHouseApi(this.$store.state.cityId.value || 'AREA|88cff55c-aaa4-e2e0')
        this.queryHouseList = data.body.list
        console.log(this.queryHouseList)
        this.queryHouseList = this.queryHouseList.splice(0, 3)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    //
    // 收藏的操作
    async collectFn () {
      console.log(123)
      if (this.isCollect) {
        try {
          console.log(this.id)
          await delCollectApi(this.id)
          this.isCollect = !this.isCollect
          this.$toast.success('取消收藏')
        } catch (err) {
          console.log(err)
          this.$toast.fail('取消收藏失败')
        }
      } else {
        try {
          await addCollectApi(this.id)
          this.isCollect = !this.isCollect
          this.$toast.success('收藏成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('收藏失败')
        }
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { RoomMessage }
}
</script>

<style scoped lang='less'>
body {
  padding-bottom: 90px !important;
}
.slideshow-box {
  position: relative;
  width: 375px;
  height: 212px;
  overflow: hidden;
  /deep/.van-image-preview {
    width: 375px !important;
    height: 100vh !important;
  }
}
/deep/.van-image-preview__swipe{
  height: 100vh;
}
.HouseDetail_info__w_ymp {
  padding: 15px;
  h3 {
    font-weight: 400;
    font-size: 16px;
    color: #333;
    line-height: 1.15;
    margin: 16px 0;
  }
  .tag {
    padding: 10px 0;
    height: 40px !important;
    font-size: 16px;
  }
}
.van-grid-item__content {
  span.text-left {
    color: #fa5741 !important ;
    font-size: 18px;
    font-weight: bolder;
  }
  span.text-right {
    color: #fa5741 !important ;
    font-size: 12px;
  }
  .text-bottom {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
  }
}
.row-left-text {
  font-size: 13px !important;
  color: #999;
}
.row-right-text {
  font-size: 13px !important;
  color: #333;
}
// map
.map {
  h3 {
    font-size: 14px;
    margin: 0 15px;
  }
  .map-box {
    left: 0px;
    top: 0px;
    z-index: 9;
    overflow: hidden;
    user-select: none;
    width: 414px;
    height: 145px;
    background-color: rgb(100, 199, 61);
  }
}
.rent-list {
  .am-list-header {
    padding: 15px 15px 9px;
    color: #21b97a;
    background-color: #fff;
    font-size: 15px;
    line-height: 15px;
    border-bottom: 1px solid #ddd;
  }
  .am-list-item-middle {
    padding-left: 15px;
  }
  // 上传照片的样式
  .van-uploader {
    margin-top: 8px;
  }
}
.textColor {
  color: #333 !important;
}
/deep/ .img-icon {
  height: 20px;
}
.van-checkbox {
  display: flex;
  text-align: center;
  flex-direction: column;
  /deep/span {
    font-size: 23px;
    width: 40px;
    height: 40px;
  }
  /deep/.van-checkbox__label {
    font-size: 14px;
    margin: 0;
    margin-top: 5px;
  }
}
/deep/.van-grid-item__content--center {
  padding: 0;
  padding-top: 10px;
}
/deep/.van-checkbox[data-v-3d1a19c4] span {
  height: 0.8rem;
  width: 60px;
}
.active-color {
  color: #21b97a;
}
.desc {
  margin-top: 15px;
}
/deep/ textarea {
  height: 135px !important;
}
.button-addRoom {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 9999;
  .quxiao {
    width: 100%;
  }
  .queren {
    width: 100%;
  }
}
// 房源概况
h3 {
  font-size: 15px;
}
.HouseDetail_describe {
  margin: 10px;
  // background-color: aquamarine;
  .HouseDetail_user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;

    .left {
      display: flex;
      font-size: 14px;

      img {
        height: 62px;
        margin-right: 12px;
      }
      .HouseDetail_useInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .text_color {
          color: #fa5741;
        }
      }
    }
    .right {
      /deep/.van-button {
        height: 35px;
        margin-right: 15px;
      }
    }
  }
  .HouseDetail_descText {
    width: 100%;
    min-height: 80px;
    font-size: 14px;
    color: #333;
    margin-top: 10px;
  }
}
.HouseDetail_recommend {
  margin: 10px;
  margin-bottom: 45px;
}
/deep/.van-checkbox[data-v-c32b4890] span {
  width: 45px;
}
.button-detailRoom {
  position: fixed;
  bottom: 0;
  width: 375px;
  /deep/ .van-button {
    width: 100%;
    font-size: 17px !important;
  }
}
/deep/.van-image-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 375px;
  height: 100vh;
}
</style>

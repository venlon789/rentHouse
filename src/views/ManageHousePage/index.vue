<template>
  <div>
    <van-nav-bar title="房屋管理" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 这表示的是没有发布出租信息会显示 -->
    <div class="empty-container" v-if="UserManageHouseList.length === 0">
      <img src="@/assets/not-found.png" alt="" />
      <p>
        您还没有房源，
        <a class="Rent_link__2yGRO" @click="$router.push('/addroom')"
          >去发布房源</a
        >
        吧~
      </p>
    </div>
    <!-- 如果发布过会显示 -->

    <div class="container">
      <van-loading color="#1989fa" v-if="isLoading"
        >发布的房源加载中...</van-loading
      >
      <RoomMessage
        v-else
        :item="item"
        v-for="(item, index) in UserManageHouseList"
        :key="index"
      ></RoomMessage>
    </div>
  </div>
</template>

<script>
import { getUserManageHouseApi } from '@/api/manage'
import RoomMessage from '@/components/RoomMessage.vue'
export default {
  created () {
    this.getUserManageHouse()
  },
  data () {
    return {
      isLoading: true,
      UserManageHouseList: []
    }
  },
  methods: {
    async getUserManageHouse () {
      try {
        const { data } = await getUserManageHouseApi()
        console.log(data)
        this.UserManageHouseList = data.body
        this.isLoading = false
      } catch (err) {
        console.log(err)
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
.empty-container {
  padding-top: 30px;
  text-align: center;
  img {
    width: 150px;
    height: 97px;
    margin-bottom: 30px;
  }
  p {
    font-size: 14px;
    a {
      color: #33be85;
    }
  }
}
.container{
  text-align: center;
}
.van-image-preview__swipe{
  height: 100px;
}
</style>

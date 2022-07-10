<template>
  <div>
    <!-- 未登录的时候 -->
    <div class="My-title" v-if="user === null">
      <div class="My-title-box">
        <div class="useimg">
          <van-image
            round
            fit="cover"
            width="2rem"
            height="2rem"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <span class="username">游客</span>
        <van-button
          type="primary"
          class="gologin"
          @click="$router.push('/login')"
          >去登陆</van-button
        >
      </div>
    </div>
    <!-- 登录的时候 -->
    <div class="My-title" v-else>
      <div class="My-title-box">
        <div class="useimg">
          <van-image
            round
            fit="cover"
            width="2rem"
            height="2rem"
            :src="'http://liufusong.top:8080'+userInfo.avatar"
          />
        </div>
        <span class="username">{{ userInfo.nickname }}</span>
        <van-button type="primary" class="gologin" @click="exitFn"
          >退出</van-button
        >
        <p class="edit">编辑个人资料</p>
      </div>
    </div>
    <!-- 我的收藏 -->
    <van-grid :column-num="3" :border="false">
      <van-grid-item icon="star-o" text="我的收藏" />
      <van-grid-item icon="wap-home-o" to="/manage" text="我的出租" />
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="debit-pay" text="成为房主" />
      <van-grid-item icon="contact" text="个人资料" />
      <van-grid-item icon="phone-circle-o" text="联系我们" />
    </van-grid>
    <!-- join -->
    <div class="join">
      <img class="join-img" src="@/assets/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUseInfoApi } from '@/api/my'
export default {
  async created () {
    const res = await getUseInfoApi()
    console.log(res)
    this.userInfo = res.data.body
    console.log(this.userInfo)
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    exitFn () {
      this.$dialog.confirm({
        message: '是否确认退出登录'
      })
        .then(() => {
          // on confirm
          // this.$store.state.user = null
          // console.log(this.$store.state.user)
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.My-title {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 375px;
  height: 300px;
  background: url("~@/assets/bg.png") no-repeat;
  background-size: contain;
  .My-title-box {
    box-shadow: 0 0 10px 3px #ddd;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 0;
    margin: auto;
    width: 318px;
    height: 165px;
    // background-color: pink;
    // overflow: hidden;
    .useimg {
      transform: translateY(-30px);
    }
    .username {
      transform: translateY(-30px);
      display: block;
      line-height: 17px;
      font-size: 13px;
      text-align: center;
    }
    .van-button {
      transform: translateY(-30px);
      width: 69px;
      height: 30px;
      border-radius: 4px;
    }
    .edit {
      transform: translateY(-30px);
      font-size: 15px;
      color: #ccc;
    }
  }
}
/deep/ .van-image {
  box-shadow: 0 0 10px 3px #ddd;
  border: 5px solid #f5f5f5 !important;
}
/deep/ .van-button {
  width: 72px;
  height: 30px;
  .van-button__text {
    font-size: 12px;
    line-height: 17px;
  }
}
.join {
  width: 345px;
  height: 85px;
  margin: auto;
  .join-img {
    width: 100%;
  }
}
</style>

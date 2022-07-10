<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>

    <van-tabbar route active-color="rgb(33, 185, 122)">
      <van-tabbar-item replace to="/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item replace to="/findhouse" icon="search"
        >找房</van-tabbar-item
      >
      <van-tabbar-item replace to="/new" icon="newspaper-o"
        >资讯</van-tabbar-item
      >
      <van-tabbar-item replace to="/my" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LAYOUT',
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

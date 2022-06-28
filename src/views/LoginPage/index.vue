<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
      />
      <div style="margin: 16px">
        <van-button round block type="info" square native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi } from '@/api/login'
export default {
  name: 'login',
  created () { },
  data () {
    return {
      username: 'itheima',
      password: '123456'
    }
  },
  methods: {
    async onSubmit (value) {
      console.log(value)
      if (value.username === '' || value.password === '') {
        this.$toast.fail('用户名和密码不能为空')
        return
      }
      const ze = /^[a-zA-Z0-9]{5,8}$/
      const zheng = /^[a-zA-Z0-9]{5,12}$/
      if (!ze.test(value.username)) {
        this.$toast.fail('用户名格式为5-8位字母和数字')
      } else if (!zheng.test(value.password)) {
        this.$toast.fail('密码格式为5-12位字母和数字')
      } else {
        try {
          const res = await loginApi(value)
          console.log(res)
          if (res.data.status === 400) {
            this.$toast.fail('账号或者密码不正确，请重新登录')
          } if (res.data.status === 200) {
            this.$toast.success('登录成功')
            this.$store.commit('setUser', res.data.body)
            this.$router.back()
          }
        } catch (err) {
          this.$toast.fail('账号或者密码不正确，请重新登录')
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-button--info {
  background-color: #21b97a;
}
</style>

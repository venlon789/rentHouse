<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <!-- 组件渲染城市列表 -->
    <van-index-bar :index-list="selectCityAZ">
      <div v-for="(obj, key) in list" :key="key">
        <van-index-anchor :index="key" />
        <van-cell
          :title="item.label"
          v-for="(item, index) in obj"
          :key="index"
          @click="selectCity(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { getCityListApi } from '@/api/city'
export default {
  name: 'CityPage',
  created () {
    this.getCityListFn()
    console.log(this.list)
  },
  mounted () {
    console.log(this.list)
  },
  data () {
    return {
      // 所有的城市列表
      allCity: [],
      // 筛选后的城市
      selectCityAZ: [],
      list: {}
    }
  },
  methods: {
    async getCityListFn () {
      const { data } = await getCityListApi(1)
      // console.log(data)
      // this.allCity = data.body
      // console.log(this.allCity)
      // 获取里面的字母
      data.body.forEach(element => {
        const type = element.short.charAt(0).toUpperCase()
        if (this.selectCityAZ.every(item => item !== type)) {
          this.selectCityAZ.push(type)
        }
      })
      this.selectCityAZ.sort()
      this.selectCityAZ.forEach(item => {
        const arr = data.body.filter(ele => {
          return ele.short.charAt(0).toUpperCase() === item
        })
        // console.log(arr)
        this.list[item] = arr
      })
    },
    selectCity (val) {
      this.$store.commit('getselsctCityId', val)
      console.log(val.value)
      this.$router.back()
    }

  },
  computed: {},
  watch: {
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

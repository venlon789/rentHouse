<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import { getCityListApi } from '@/api/city'
export default {
  created () {
    this.getCityListFn()
    console.log(this.selectCityList)
  },
  data () {
    return {
      // 所以的城市列表
      allCity: [],
      // 筛选后的城市
      selectCityAZ: []
    }
  },
  methods: {
    async getCityListFn () {
      const { data } = await getCityListApi(1)
      console.log(data)
      this.allCity = data.body
      console.log(this.allCity)
      // 获取里面的字母
      this.allCity.forEach(element => {
        const type = element.short.charAt(0).toUpperCase()
        console.log(type)
        if (this.selectCityAZ.every(item => item !== type)) {
          this.selectCityAZ.push(type)
        }
      })
      // console.log(this.selectCityList)
      // this.selectCityList.forEach(element => {
      //   console.log(element)
      //   this.allCity.forEach(item => {
      //     console.log(item)
      //     if (item.short.charAt(0).toUpperCase() === element) {
      //       console.log(item.label)
      //       // this.selectCityList.element = item.tabel
      //     }
      //   })
      // })
    },

    // 城市筛选
    selectCity () {
      console.log(this.selectCityAZ)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

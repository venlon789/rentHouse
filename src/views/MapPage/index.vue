<template>
  <div>
    <van-nav-bar title="地图找房" left-arrow>
      <van-icon name="arrow-left" slot="left" @click="$router.back()" />
    </van-nav-bar>
    <div id="container"></div>
  </div>
</template>

<script>
import { getMapApi } from '@/api/map'
export default {
  created () {

  },
  async mounted () {
    await this.getMap()
    const { BMapGL } = window
    const map = new BMapGL.Map('container')
    console.log(this.middleOfCity.longitude)
    console.log(this.middleOfCity.latitude)
    const point = new BMapGL.Point(this.middleOfCity.longitude, this.middleOfCity.latitude)
    map.centerAndZoom(point, 15)
    // 遍历自己的数据

    const content = '<p>朝阳简单</p><p>12121撞</p>'
    const label = new BMapGL.Label(content, { // 创建文本标注
      position: point,
      offset: new BMapGL.Size(10, 20)
    })
    map.addOverlay(label) // 将标注添加到地图中
    label.setStyle({ // 设置label的样式
      color: '#fff',
      fontSize: '12px',
      width: '70px',
      height: '70px',
      borderRadius: '50%',
      backgroundColor: '#33be85',
      textAlign: 'center',
      padding: '12px',
      lineHeight: '20px',
      border: 'none'
    })

    label.addEventListener('click', function () {
      map.centerAndZoom(point, 18)
    })
  },
  data () {
    return {
      // 当前城市中心位置
      middleOfCity: {
        latitude: '',
        longitude: ''
      },
      // 所有的房源信息
      AllOfCity: []
    }
  },
  methods: {
    async getMap () {
      const { data: { body } } = await getMapApi(this.$store.state.cityId.value)
      console.log(body)
      this.AllOfCit = body
      this.middleOfCity.latitude = body[0].coord.latitude
      this.middleOfCity.longitude = body[0].coord.longitude
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
#container {
  width: 100vw;
  height: 100vh;
}
</style>
